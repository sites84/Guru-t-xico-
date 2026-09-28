import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, onAuthStateChanged, signInWithRedirect, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../supabase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp, completeTask } from '../supabase';
import confetti from 'canvas-confetti';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../supabase';
import { UserProfile, GuruRank, Achievement } from '../types';
import { GURU_RANKS, getRankByPoints, getNextRank, ACHIEVEMENTS_LIST, getAchievementById } from '../data/rankData';
import { toxicAudio } from '../utils/audio';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  currentRank: GuruRank;
  nextRankInfo: {
    nextRank: GuruRank | null;
    pointsNeeded: number;
    progressPercent: number;
  };
  isProfileOpen: boolean;
  setIsProfileOpen: (val: boolean) => void;
  dailyStreak: number;
  bestStreak: number;
  recordDailyTasksCompleted: (dayDateString: string) => Promise<number>;
  achievementQueue: Achievement[];
  dismissCurrentAchievement: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string, createAccount?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  resetUserProgress: () => Promise<void>;
  unlockAchievement: (achievementId: string, customBonusPoints?: number) => Promise<void>;
  recordTaskCompletion: (taskId: string, alphaScore: number, difficulty: string) => Promise<void>;
  recordConsultation: (questionText?: string) => Promise<void>;
  recordQuizCompletion: (scorePercentage?: number) => Promise<void>;
  recordMantraCompletion: (mantraDifficulty: string, secondsTaken?: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);

  // Dismiss current achievement popup from the queue
  const dismissCurrentAchievement = useCallback(() => {
    setAchievementQueue((prev) => prev.slice(1));
  }, []);

  // Trigger celebration effects for an achievement
  const celebrateAchievement = useCallback((achievement: Achievement) => {
    toxicAudio.playCashRegister();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a3e635', '#facc15', '#c084fc', '#ffffff']
      });
    } catch {}
    setAchievementQueue((prev) => {
      // Avoid duplicate popups in queue
      if (prev.some((a) => a.id === achievement.id)) return prev;
      return [...prev, achievement];
    });
  }, []);

  // Sync auth state & Firestore profile
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, 'users', currentUser.uid);

      const unsubscribeDoc = onSnapshot(
        userDocRef,
        async (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.data() as UserProfile);
            setLoading(false);
          } else {
            // First time login: initialize profile document
            try {
              const initialRank = GURU_RANKS[0].title;
              const newProfile: UserProfile = {
                id: currentUser.uid,
                email: currentUser.email || '',
                displayName: currentUser.displayName || 'Gado Inicial',
                photoURL: currentUser.photoURL || '',
                totalPoints: 0,
                completedTasksCount: 0,
                currentRank: initialRank,
                achievements: [],
                completedTaskIds: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              };

              await setDoc(userDocRef, newProfile);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`);
            }
            setLoading(false);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
          setLoading(false);
        }
      );

      return () => unsubscribeDoc();
    });

    return () => unsubscribeAuth();
  }, []);

  // Check early morning insomnia achievement (03:00 - 05:00)
  useEffect(() => {
    if (!user || !profile) return;
    const hour = new Date().getHours();
    if (hour >= 3 && hour < 5) {
      if (!profile.achievements?.includes('CORUJA_DA_PRODUTIVIDADE')) {
        unlockAchievement('CORUJA_DA_PRODUTIVIDADE');
      }
    }
  }, [user, profile?.id]);

  const loginWithGoogle = async () => {
    try {
      // Redirect is more reliable than a popup on GitHub Pages and mobile browsers.
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      const message = error instanceof Error ? error.message : String(error);
      alert(`Não foi possível entrar com Google.\n\n${message}`);
    }
  };

  const loginWithEmail = async (email: string, password: string, createAccount = false) => {
    const cleanEmail = email.trim();
    if (!cleanEmail || password.length < 6) {
      throw new Error('Informe um e-mail válido e uma senha com pelo menos 6 caracteres.');
    }
    try {
      if (createAccount) {
        await createUserWithEmailAndPassword(auth, cleanEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
      }
      toxicAudio.playCashRegister();
    } catch (error) {
      console.error('Email sign-in failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setProfile(null);
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  /**
   * Reset all user points, rank, achievements, and completed tasks for testing.
   */
  const resetUserProgress = useCallback(async () => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      const initialRank = GURU_RANKS[0].title;
      const secretAchievement = getAchievementById('TESTADOR_REINCIDENTE');

      await updateDoc(userDocRef, {
        totalPoints: 0,
        completedTasksCount: 0,
        currentRank: initialRank,
        dailyStreak: 0,
        bestStreak: 0,
        lastCompletedDate: '',
        achievements: secretAchievement ? ['TESTADOR_REINCIDENTE'] : [],
        completedTaskIds: [],
        updatedAt: serverTimestamp(),
      });

      // Clear local storage daily caches and streak
      const today = new Date().toISOString().slice(0, 10);
      localStorage.removeItem(`guru_toxico_completed_10_${today}`);
      localStorage.removeItem('guru_toxico_tasks_completed_today');
      localStorage.removeItem('guru_toxico_quiz_completed');
      localStorage.removeItem('guru_toxico_mantra_count');
      localStorage.removeItem('guru_toxico_consultation_count');
      localStorage.removeItem('guru_toxico_daily_streak');
      localStorage.removeItem('guru_toxico_best_streak');
      localStorage.removeItem('guru_toxico_last_completed_date');
      localStorage.removeItem('guru_toxico_day_offset');

      // Trigger secret reincident achievement popup
      if (secretAchievement) {
        celebrateAchievement(secretAchievement);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  }, [user, celebrateAchievement]);

  /**
   * Record that the user completed their daily tasks for a specific day string (YYYY-MM-DD),
   * calculating the streak counter accordingly and testing streak achievements.
   */
  const recordDailyTasksCompleted = useCallback(
    async (dayDateString: string): Promise<number> => {
      const prevDate = user && profile?.lastCompletedDate
        ? profile.lastCompletedDate
        : (typeof window !== 'undefined' ? localStorage.getItem('guru_toxico_last_completed_date') || '' : '');
      const prevStreak = user && profile?.dailyStreak !== undefined
        ? (profile.dailyStreak || 0)
        : (typeof window !== 'undefined' ? Number(localStorage.getItem('guru_toxico_daily_streak') || 0) : 0);
      const prevBest = user && profile?.bestStreak !== undefined
        ? (profile.bestStreak || 0)
        : (typeof window !== 'undefined' ? Number(localStorage.getItem('guru_toxico_best_streak') || 0) : 0);

      let newStreak = 1;
      if (prevDate) {
        if (prevDate === dayDateString) {
          // Already registered for this exact day
          return Math.max(1, prevStreak);
        }
        const prev = new Date(prevDate + 'T00:00:00');
        const curr = new Date(dayDateString + 'T00:00:00');
        const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak = prevStreak + 1;
        } else if (diffDays <= 0) {
          newStreak = Math.max(1, prevStreak);
        } else {
          // Skipped a day or more
          newStreak = 1;
        }
      }

      const newBest = Math.max(prevBest, newStreak);

      // Save to localStorage for instant local/offline availability
      localStorage.setItem('guru_toxico_last_completed_date', dayDateString);
      localStorage.setItem('guru_toxico_daily_streak', String(newStreak));
      localStorage.setItem('guru_toxico_best_streak', String(newBest));

      // If user is authenticated, sync to Firestore and check streak achievements
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const currentData = snap.data() as UserProfile;
            const newAchievements = [...(currentData.achievements || [])];
            const popupsToTrigger: Achievement[] = [];

            const testAndQueue = (achId: string, condition: boolean) => {
              if (condition && !newAchievements.includes(achId)) {
                newAchievements.push(achId);
                const item = getAchievementById(achId);
                if (item) popupsToTrigger.push(item);
              }
            };

            testAndQueue('STREAK_3_DIAS', newStreak >= 3);
            testAndQueue('STREAK_7_DIAS', newStreak >= 7);
            testAndQueue('STREAK_14_DIAS', newStreak >= 14);

            await updateDoc(userDocRef, {
              dailyStreak: newStreak,
              bestStreak: newBest,
              lastCompletedDate: dayDateString,
              achievements: newAchievements,
              updatedAt: serverTimestamp(),
            });

            popupsToTrigger.forEach((ach) => celebrateAchievement(ach));
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
        }
      }

      return newStreak;
    },
    [user, profile, celebrateAchievement]
  );

  /**
   * General-purpose achievement unlocker.
   */
  const unlockAchievement = useCallback(
    async (achievementId: string, customBonusPoints?: number) => {
      if (!user) return;

      const userDocRef = doc(db, 'users', user.uid);
      try {
        const snap = await getDoc(userDocRef);
        if (!snap.exists()) return;

        const currentData = snap.data() as UserProfile;
        const currentAchievements = currentData.achievements || [];

        if (currentAchievements.includes(achievementId)) return;

        const achievementObj = getAchievementById(achievementId);
        if (!achievementObj) return;

        const reward = customBonusPoints !== undefined ? customBonusPoints : achievementObj.pointsReward;
        const nextPoints = (currentData.totalPoints || 0) + reward;
        const nextRank = getRankByPoints(nextPoints);
        const nextAchievements = [...currentAchievements, achievementId];

        // Check if new points unlock any point milestones or patent ranks
        checkRankAndPointAchievements(nextPoints, nextAchievements);

        await updateDoc(userDocRef, {
          totalPoints: nextPoints,
          currentRank: nextRank.title,
          achievements: nextAchievements,
          updatedAt: serverTimestamp(),
        });

        celebrateAchievement(achievementObj);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    },
    [user, celebrateAchievement]
  );

  // Helper to test and push point & rank achievements into an achievements array
  const checkRankAndPointAchievements = (points: number, list: string[]): Achievement[] => {
    const newlyUnlocked: Achievement[] = [];

    const testAndAdd = (achId: string, condition: boolean) => {
      if (condition && !list.includes(achId)) {
        list.push(achId);
        const item = getAchievementById(achId);
        if (item) newlyUnlocked.push(item);
      }
    };

    // Points milestones
    testAndAdd('PRIMEIROS_PONTOS', points >= 25);
    testAndAdd('CINQUENTA_PONTOS', points >= 50);
    testAndAdd('CENTURIAO_ALPHA', points >= 100);
    testAndAdd('DUZENTOS_PONTOS', points >= 200);
    testAndAdd('QUATROCENTOS_PONTOS', points >= 400);
    testAndAdd('SEISCENTOS_PONTOS', points >= 600);
    testAndAdd('MIL_PONTOS_INSANIDADE', points >= 1000);
    testAndAdd('DOIS_MIL_PONTOS', points >= 2000);

    // Patentes
    testAndAdd('PATENTE_GELADA', points >= 50);
    testAndAdd('PATENTE_TERRA', points >= 100);
    testAndAdd('PATENTE_MENTORIA', points >= 200);
    testAndAdd('PATENTE_PORSCHE', points >= 350);
    testAndAdd('PATENTE_MADRUGADA', points >= 550);
    testAndAdd('PATENTE_ELEVADOR', points >= 800);
    testAndAdd('PATENTE_DOPAMINA', points >= 1100);
    testAndAdd('PATENTE_FRANQUIA', points >= 1500);
    testAndAdd('GURU_MAXIMO', points >= 2000);

    return newlyUnlocked;
  };

  /**
   * Record task completion and test all 15+ task related achievements.
   */
  const recordTaskCompletion = useCallback(
    async (taskId: string, alphaScore: number, difficulty: string) => {
      if (!user) return;

      try {
        // Atomic server-side completion: points and task ID are saved together.
        const completed = await completeTask(taskId, alphaScore);

        const nextPoints = Number(completed.totalPoints || 0);
        const nextTasksCount = Number(completed.completedTasksCount || 0);
        const currentAchievements = [...(completed.achievements || [])];
        const newAchievements = [...currentAchievements];
        const popupsToTrigger: Achievement[] = [];

        const testAndQueue = (achId: string, condition: boolean) => {
          if (condition && !newAchievements.includes(achId)) {
            newAchievements.push(achId);
            const item = getAchievementById(achId);
            if (item) popupsToTrigger.push(item);
          }
        };

        testAndQueue('PRIMEIRA_HUMILHACAO', nextTasksCount >= 1);
        testAndQueue('DOIS_PASSOS_ABISMO', nextTasksCount >= 2);
        testAndQueue('GUERREIRO_LOUCURA', nextTasksCount >= 5);
        testAndQueue('SETE_PECADOS_ALPHA', nextTasksCount >= 7);
        testAndQueue('PROTOCOLO_SPARTAN_10X', nextTasksCount >= 10);
        testAndQueue('MARATONISTA_15_TAREFAS', nextTasksCount >= 15);
        testAndQueue('VETERANO_25_TAREFAS', nextTasksCount >= 25);
        testAndQueue('MONSTRO_40_TAREFAS', nextTasksCount >= 40);
        testAndQueue('LENDA_50_TAREFAS', nextTasksCount >= 50);

        testAndQueue('DESAFIO_DESUMANO', difficulty === 'Desumano');
        testAndQueue('ESPECIALISTA_RIDICULO', difficulty === 'Ridículo');
        testAndQueue('MESTRE_EXTREMO', difficulty === 'Extremo');

        if (taskId === 'task-1' || taskId === 'task-5' || taskId === 'task-20') {
          testAndQueue('INIMIGO_DO_COLCHAO', true);
        }
        if (taskId === 'task-8' || taskId === 'task-12' || taskId === 'task-62') {
          testAndQueue('TERROR_DO_MERCADO', true);
        }

        const rankPointUnlocks = checkRankAndPointAchievements(nextPoints, newAchievements);
        popupsToTrigger.push(...rankPointUnlocks);

        if (newAchievements.length !== currentAchievements.length) {
          await updateDoc(doc(db, 'users', user.uid), {
            achievements: newAchievements,
            updatedAt: serverTimestamp(),
          });
        }

        popupsToTrigger.forEach((ach) => celebrateAchievement(ach));
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    },
    [user, celebrateAchievement]
  );

  /**
   * Record personal consultation with Guru and check chat achievements.
   */
  const recordConsultation = useCallback(
    async (questionText?: string) => {
      if (!user) return;
      const userDocRef = doc(db, 'users', user.uid);
      try {
        const snap = await getDoc(userDocRef);
        if (!snap.exists()) return;
        const currentData = snap.data() as UserProfile;

        const currentCount = Number(localStorage.getItem('guru_toxico_consultation_count') || 0) + 1;
        localStorage.setItem('guru_toxico_consultation_count', String(currentCount));

        const newAchievements = [...(currentData.achievements || [])];
        const popupsToTrigger: Achievement[] = [];

        const testAndQueue = (achId: string, condition: boolean) => {
          if (condition && !newAchievements.includes(achId)) {
            newAchievements.push(achId);
            const item = getAchievementById(achId);
            if (item) popupsToTrigger.push(item);
          }
        };

        testAndQueue('ORACULO_CONSULTADO', currentCount >= 1);
        testAndQueue('MASOQUISTA_REINCIDENTE', currentCount >= 3);
        testAndQueue('CLIENTE_VIP_DO_INSULTO', currentCount >= 5);
        testAndQueue('AUDIENCIA_COMPLETA', currentCount >= 10);

        if (questionText) {
          const lower = questionText.toLowerCase();
          if (lower.includes('clt') || lower.includes('folga') || lower.includes('direito') || lower.includes('salário')) {
            testAndQueue('PERGUNTA_DE_CLT', true);
          }
          if (lower.includes('sono') || lower.includes('dormir') || lower.includes('cansa') || lower.includes('descanso')) {
            testAndQueue('PERGUNTA_DO_SONO', true);
          }
          if (lower.includes('elogio') || lower.includes('bom') || lower.includes('parabens') || lower.includes('parabéns')) {
            testAndQueue('PERGUNTA_DE_ELOGIO', true);
          }
        }

        const bonusPoints = (currentData.totalPoints || 0) + 2;
        const nextRank = getRankByPoints(bonusPoints);
        const rankPointUnlocks = checkRankAndPointAchievements(bonusPoints, newAchievements);
        popupsToTrigger.push(...rankPointUnlocks);

        await updateDoc(userDocRef, {
          totalPoints: bonusPoints,
          currentRank: nextRank.title,
          achievements: newAchievements,
          updatedAt: serverTimestamp(),
        });

        popupsToTrigger.forEach((ach) => celebrateAchievement(ach));
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    },
    [user, celebrateAchievement]
  );

  /**
   * Record mediocrity quiz completion.
   */
  const recordQuizCompletion = useCallback(
    async (scorePercentage?: number) => {
      if (!user) return;
      const userDocRef = doc(db, 'users', user.uid);
      try {
        const snap = await getDoc(userDocRef);
        if (!snap.exists()) return;
        const currentData = snap.data() as UserProfile;

        const newAchievements = [...(currentData.achievements || [])];
        const popupsToTrigger: Achievement[] = [];

        const testAndQueue = (achId: string, condition: boolean) => {
          if (condition && !newAchievements.includes(achId)) {
            newAchievements.push(achId);
            const item = getAchievementById(achId);
            if (item) popupsToTrigger.push(item);
          }
        };

        testAndQueue('MEDIOCRE_CONSCIENTE', true);
        if (scorePercentage !== undefined && scorePercentage < 40) {
          testAndQueue('BETA_CERTIFICADO', true);
        }
        if (scorePercentage !== undefined && scorePercentage >= 90) {
          testAndQueue('GABARITO_DA_ILUSAO', true);
        }

        const bonusPoints = (currentData.totalPoints || 0) + 3;
        const nextRank = getRankByPoints(bonusPoints);
        const rankPointUnlocks = checkRankAndPointAchievements(bonusPoints, newAchievements);
        popupsToTrigger.push(...rankPointUnlocks);

        await updateDoc(userDocRef, {
          totalPoints: bonusPoints,
          currentRank: nextRank.title,
          achievements: newAchievements,
          updatedAt: serverTimestamp(),
        });

        popupsToTrigger.forEach((ach) => celebrateAchievement(ach));
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    },
    [user, celebrateAchievement]
  );

  /**
   * Record toxic affirmation typing completion.
   */
  const recordMantraCompletion = useCallback(
    async (mantraDifficulty: string, secondsTaken?: number) => {
      if (!user) return;
      const userDocRef = doc(db, 'users', user.uid);
      try {
        const snap = await getDoc(userDocRef);
        if (!snap.exists()) return;
        const currentData = snap.data() as UserProfile;

        const currentCount = Number(localStorage.getItem('guru_toxico_mantra_count') || 0) + 1;
        localStorage.setItem('guru_toxico_mantra_count', String(currentCount));

        const newAchievements = [...(currentData.achievements || [])];
        const popupsToTrigger: Achievement[] = [];

        const testAndQueue = (achId: string, condition: boolean) => {
          if (condition && !newAchievements.includes(achId)) {
            newAchievements.push(achId);
            const item = getAchievementById(achId);
            if (item) popupsToTrigger.push(item);
          }
        };

        testAndQueue('PRIMEIRO_MANTRA', currentCount >= 1);
        testAndQueue('DEDOS_DE_ACO', currentCount >= 3);
        testAndQueue('PENTAGRAMA_TOXICO', currentCount >= 5);
        testAndQueue('DECALOGO_DA_VERGONHA', currentCount >= 10);
        testAndQueue('MESTRE_DOS_MANTRAS', currentCount >= 15);

        if (mantraDifficulty === 'Espartano') {
          testAndQueue('AFIRMACAO_ESPARTANA', true);
        }
        if (mantraDifficulty === 'Humilhante') {
          testAndQueue('TRIPLO_HUMILHANTE', true);
        }
        if (secondsTaken !== undefined && secondsTaken < 10) {
          testAndQueue('VELOCIDADE_DO_DESESPERO', true);
        }

        const bonusPoints = (currentData.totalPoints || 0) + 2;
        const nextRank = getRankByPoints(bonusPoints);
        const rankPointUnlocks = checkRankAndPointAchievements(bonusPoints, newAchievements);
        popupsToTrigger.push(...rankPointUnlocks);

        await updateDoc(userDocRef, {
          totalPoints: bonusPoints,
          currentRank: nextRank.title,
          achievements: newAchievements,
          updatedAt: serverTimestamp(),
        });

        popupsToTrigger.forEach((ach) => celebrateAchievement(ach));
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    },
    [user, celebrateAchievement]
  );

  const currentPoints = profile?.totalPoints || 0;
  const currentRank = getRankByPoints(currentPoints);
  const nextRankInfo = getNextRank(currentPoints);

  const rawLastCompletedDate = user && profile?.lastCompletedDate
    ? profile.lastCompletedDate
    : (typeof window !== 'undefined' ? localStorage.getItem('guru_toxico_last_completed_date') || '' : '');
  const rawDailyStreak = user && profile?.dailyStreak !== undefined
    ? (profile.dailyStreak || 0)
    : (typeof window !== 'undefined' ? Number(localStorage.getItem('guru_toxico_daily_streak') || 0) : 0);
  const bestStreak = user && profile?.bestStreak !== undefined
    ? (profile.bestStreak || 0)
    : (typeof window !== 'undefined' ? Number(localStorage.getItem('guru_toxico_best_streak') || 0) : 0);

  // Compute active streak (check if streak broke because more than 1 day passed without completion)
  const computeActiveStreak = (): number => {
    if (!rawLastCompletedDate || rawDailyStreak <= 0) return 0;
    const dayOffset = typeof window !== 'undefined' ? Number(localStorage.getItem('guru_toxico_day_offset') || 0) : 0;
    const testDate = new Date();
    testDate.setDate(testDate.getDate() + dayOffset);
    const today = testDate.toISOString().slice(0, 10);

    if (rawLastCompletedDate === today) return rawDailyStreak;

    const prev = new Date(rawLastCompletedDate + 'T00:00:00');
    const curr = new Date(today + 'T00:00:00');
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      // Completed yesterday or current simulated day, streak is active
      return rawDailyStreak;
    }
    // More than 1 day skipped
    return 0;
  };

  const dailyStreak = computeActiveStreak();

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        currentRank,
        nextRankInfo,
        isProfileOpen,
        setIsProfileOpen,
        dailyStreak,
        bestStreak,
        recordDailyTasksCompleted,
        achievementQueue,
        dismissCurrentAchievement,
        loginWithGoogle,
        loginWithEmail,
        logout,
        resetUserProgress,
        unlockAchievement,
        recordTaskCompletion,
        recordConsultation,
        recordQuizCompletion,
        recordMantraCompletion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
