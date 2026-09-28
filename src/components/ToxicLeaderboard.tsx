import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Crown, Medal, ShieldAlert, Sparkles, User as UserIcon } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { getRankByPoints } from '../data/rankData';

interface LeaderboardUser {
  id: string;
  displayName: string;
  photoURL?: string;
  totalPoints: number;
  currentRank: string;
  badge?: string;
  isCurrentUser?: boolean;
}

// Fallback satirical champions if fewer than 5 registered users exist in Firestore
const DEFAULT_TOP_CHAMPIONS: LeaderboardUser[] = [
  {
    id: 'bot-1',
    displayName: 'Marquinhos "Cold Shower"',
    photoURL: '',
    totalPoints: 2450,
    currentRank: 'Deus Quântico do Mindset',
    badge: '👑'
  },
  {
    id: 'bot-2',
    displayName: 'Dra. Silvana "Frequência Quântica"',
    photoURL: '',
    totalPoints: 1820,
    currentRank: 'Tubarão da Faria Lima',
    badge: '🦈'
  },
  {
    id: 'bot-3',
    displayName: 'Enzo "Foguete Sem Ré"',
    photoURL: '',
    totalPoints: 1350,
    currentRank: 'Biohacker de Garagem',
    badge: '⚡'
  },
  {
    id: 'bot-4',
    displayName: 'Valquíria "Ar Enlatado"',
    photoURL: '',
    totalPoints: 920,
    currentRank: 'Guerreiro Espartano',
    badge: '⚔️'
  },
  {
    id: 'bot-5',
    displayName: 'Kadu "Dormir é Fraqueza"',
    photoURL: '',
    totalPoints: 640,
    currentRank: 'Acordador das 04:00',
    badge: '⏰'
  }
];

export const ToxicLeaderboard: React.FC = () => {
  const { user } = useAuth();
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('totalPoints', 'desc'),
        limit(5)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedUsers: LeaderboardUser[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const points = data.totalPoints || 0;
            const rankObj = getRankByPoints(points);

            fetchedUsers.push({
              id: docSnap.id,
              displayName: data.displayName || 'Gado Anônimo',
              photoURL: data.photoURL || '',
              totalPoints: points,
              currentRank: data.currentRank || rankObj.title,
              badge: rankObj.badge
            });
          });

          // Combine with satirical defaults if fewer than 5 users in Firestore
          if (fetchedUsers.length < 5) {
            const remainingCount = 5 - fetchedUsers.length;
            const fillers = DEFAULT_TOP_CHAMPIONS.slice(0, remainingCount);
            // Sort merged list descending by points
            const merged = [...fetchedUsers, ...fillers].sort((a, b) => b.totalPoints - a.totalPoints);
            setTopUsers(merged.slice(0, 5));
          } else {
            setTopUsers(fetchedUsers);
          }

          setLoading(false);
        },
        (error) => {
          console.warn('Erro ao carregar ranking do Firestore, usando lista de honra:', error);
          setTopUsers(DEFAULT_TOP_CHAMPIONS);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch {
      setTopUsers(DEFAULT_TOP_CHAMPIONS);
      setLoading(false);
    }
  }, []);

  const getPositionStyling = (index: number) => {
    switch (index) {
      case 0:
        return {
          badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
          crown: <Crown className="w-4 h-4 text-amber-400 inline" />,
          label: '1º Lugar',
          border: 'border-amber-500/60 bg-gradient-to-r from-amber-950/30 via-[#141622] to-amber-950/20'
        };
      case 1:
        return {
          badgeBg: 'bg-slate-400/20 text-slate-300 border-slate-400/50 shadow-[0_0_12px_rgba(148,163,184,0.2)]',
          crown: <Medal className="w-4 h-4 text-slate-300 inline" />,
          label: '2º Lugar',
          border: 'border-slate-500/50 bg-[#10121a]'
        };
      case 2:
        return {
          badgeBg: 'bg-amber-700/20 text-amber-600 border-amber-700/50',
          crown: <Medal className="w-4 h-4 text-amber-600 inline" />,
          label: '3º Lugar',
          border: 'border-amber-700/40 bg-[#0f1118]'
        };
      default:
        return {
          badgeBg: 'bg-neutral-800 text-neutral-400 border-neutral-700',
          crown: null,
          label: `${index + 1}º Lugar`,
          border: 'border-neutral-800 bg-[#0d0f16]'
        };
    }
  };

  return (
    <div id="secao-ranking" className="pt-4 scroll-mt-20 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>Ranking dos Mais Tóxicos</span>
              <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/60 uppercase font-bold">
                TOP 5 GLOBAL
              </span>
            </h2>
            <p className="text-xs text-neutral-400">
              Os 5 usuários com maior pontuação total acumulada na pirâmide da alta performance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-tech text-neutral-400">
          <ShieldAlert className="w-4 h-4 text-lime-400 shrink-0" />
          <span>Atualizado em Tempo Real</span>
        </div>
      </div>

      {/* Leaderboard Cards */}
      <div className="rounded-2xl bg-[#0f1118] border border-neutral-800 p-3 sm:p-5 shadow-xl space-y-3">
        {loading ? (
          <div className="py-12 text-center space-y-2">
            <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-tech text-neutral-400">Calculando insanidade dos líderes...</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {topUsers.map((leader, index) => {
              const style = getPositionStyling(index);
              const isCurrentUser = user && user.id === leader.id;

              return (
                <div
                  key={leader.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 ${
                    isCurrentUser
                      ? 'border-lime-400 bg-lime-950/20 shadow-[0_0_20px_rgba(163,230,53,0.15)] ring-1 ring-lime-400'
                      : style.border
                  }`}
                >
                  {/* Left: Position, Avatar, Name & Patent */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Position Pill */}
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center font-tech font-black text-xs shrink-0 ${style.badgeBg}`}
                      title={style.label}
                    >
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                    </div>

                    {/* Avatar */}
                    {leader.photoURL ? (
                      <img
                        src={leader.photoURL}
                        alt={leader.displayName}
                        className="w-10 h-10 rounded-xl object-cover border border-neutral-700 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center text-sm font-bold font-tech text-lime-400 shrink-0">
                        {leader.badge || <UserIcon className="w-5 h-5 text-neutral-400" />}
                      </div>
                    )}

                    {/* Name & Rank Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-white font-display truncate">
                          {leader.displayName}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-tech px-2 py-0.5 rounded-full bg-lime-400 text-black font-black uppercase tracking-wider shrink-0">
                            Você
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-tech">
                        <span className="text-sm shrink-0">{leader.badge}</span>
                        <span className="text-purple-300 font-medium truncate max-w-[200px] sm:max-w-[280px]">
                          {leader.currentRank}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Points Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800/60 shrink-0">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                        <span className="text-base sm:text-lg font-black font-tech text-lime-400">
                          {leader.totalPoints.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-xs font-tech text-neutral-400 uppercase font-bold">
                          PTS
                        </span>
                      </div>
                      <span className="text-[10px] font-tech text-neutral-400 block">
                        Pontuação Total
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
