/**
 * Audio synthesis for Guru Tóxico using Web Audio API and SpeechSynthesis
 */

class ToxicAudioEngine {
  private ctx: AudioContext | null = null;
  private alarmOscillator: OscillatorNode | null = null;
  private alarmGain: GainNode | null = null;
  private alarmInterval: number | null = null;
  public isSoundMuted: boolean = false;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Piercing Alarm Siren
  public startAlarmSiren() {
    if (this.isSoundMuted) return;
    this.stopAlarmSiren();

    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    this.alarmOscillator = osc;
    this.alarmGain = gain;

    // Siren pitch modulation
    let high = false;
    this.alarmInterval = window.setInterval(() => {
      if (!this.alarmOscillator || !this.ctx) return;
      const targetFreq = high ? 700 : 1300;
      this.alarmOscillator.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
      high = !high;
    }, 220);
  }

  public stopAlarmSiren() {
    if (this.alarmInterval) {
      clearInterval(this.alarmInterval);
      this.alarmInterval = null;
    }
    if (this.alarmOscillator) {
      try {
        this.alarmOscillator.stop();
        this.alarmOscillator.disconnect();
      } catch {
        // ignore already stopped
      }
      this.alarmOscillator = null;
    }
    if (this.alarmGain) {
      try {
        this.alarmGain.disconnect();
      } catch {
        // ignore
      }
      this.alarmGain = null;
    }
  }

  // Cash Register / Cha-ching sound when user pays cowardice fine
  public playCashRegister() {
    if (this.isSoundMuted) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // High bell tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1400, now);
    osc1.frequency.exponentialRampToValueAtTime(2400, now + 0.12);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Secondary coin ring
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1900, now + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(3200, now + 0.25);
    gain2.gain.setValueAtTime(0.2, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.7);
  }

  // Stamp Thud
  public playStampThud() {
    if (this.isSoundMuted) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Error Buzzer
  public playBuzzer() {
    if (this.isSoundMuted) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Triumphant Fanfare for 10/10 Tasks Completed
  public playCelebrationFanfare() {
    if (this.isSoundMuted) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + idx * 0.08;

      osc.type = idx === notes.length - 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.25, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.6);
    });
  }

  // Voice synthesis removed per user request ("Retirar voz, não é necessário leitura")
  public speakToxicGuru(_phrase: string) {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    // No-op: voice reading is disabled
  }
}

export const toxicAudio = new ToxicAudioEngine();
