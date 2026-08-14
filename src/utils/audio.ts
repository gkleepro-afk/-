// Web Audio API ambient noise & harmonic chime generator
// 100% self-contained, no external mp3 or asset files required

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientSourceNodes: AudioNode[] = [];
  private ambientGainNode: GainNode | null = null;
  private currentAmbience: 'rain' | 'alpha' | 'waves' | 'cafe' | null = null;
  private isAmbiencePlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play pleasant harmonic chimes
  public playChime(type: 'task_done' | 'achievement' | 'pomodoro_complete' | 'level_up' | 'button') {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === 'task_done') {
        // Quick gentle major third chord (E5 -> G#5)
        [659.25, 830.61].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.12, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.4);
        });
      } else if (type === 'achievement' || type === 'level_up') {
        // Celebratory triumphant fanfare (C5 -> E5 -> G5 -> C6)
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.18, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.65);
        });
      } else if (type === 'pomodoro_complete') {
        // Gentle Tibetan meditation bowl chime (432Hz with harmonic overtones)
        [432, 864, 1296].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          const initialVol = 0.15 / (idx + 1);
          gain.gain.setValueAtTime(initialVol, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 2.6);
        });
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Start study ambient background sounds (Rain, Alpha binaural waves, Gentle waves)
  public startAmbience(type: 'rain' | 'alpha' | 'waves' | 'cafe', volume: number = 0.3) {
    this.stopAmbience();
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), ctx.currentTime);
      mainGain.connect(ctx.destination);
      this.ambientGainNode = mainGain;
      this.currentAmbience = type;
      this.isAmbiencePlaying = true;

      if (type === 'rain') {
        // Pink noise with lowpass filter + rain droplets modulation
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(mainGain);
        whiteNoise.start();
        this.ambientSourceNodes.push(whiteNoise);
      } else if (type === 'alpha') {
        // 14Hz Alpha focus binaural wave carrier (220Hz + 234Hz)
        [220, 234].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          osc.connect(gain);
          gain.connect(mainGain);
          osc.start();
          this.ambientSourceNodes.push(osc);
        });
      } else if (type === 'waves' || type === 'cafe') {
        // Ocean swell: modulated pink noise
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.06;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        // LFO for wave swell
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8s cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        noise.connect(filter);
        filter.connect(mainGain);
        noise.start();
        lfo.start();
        this.ambientSourceNodes.push(noise, lfo);
      }
    } catch {
      // Audio context policy
    }
  }

  public setAmbienceVolume(volume: number) {
    if (this.ambientGainNode && this.ctx) {
      this.ambientGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public stopAmbience() {
    this.ambientSourceNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.ambientSourceNodes = [];
    if (this.ambientGainNode) {
      this.ambientGainNode.disconnect();
      this.ambientGainNode = null;
    }
    this.currentAmbience = null;
    this.isAmbiencePlaying = false;
  }

  public getStatus() {
    return {
      isPlaying: this.isAmbiencePlaying,
      type: this.currentAmbience,
    };
  }
}

export const soundEngine = new SoundEngine();
