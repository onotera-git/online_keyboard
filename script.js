const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const blackSemitones = new Set([1, 3, 6, 8, 10]);

const keyboardLayout = [
  { key: "z", semitone: 0, type: "white" },
  { key: "s", semitone: 1, type: "black" },
  { key: "x", semitone: 2, type: "white" },
  { key: "d", semitone: 3, type: "black" },
  { key: "c", semitone: 4, type: "white" },
  { key: "v", semitone: 5, type: "white" },
  { key: "g", semitone: 6, type: "black" },
  { key: "b", semitone: 7, type: "white" },
  { key: "h", semitone: 8, type: "black" },
  { key: "n", semitone: 9, type: "white" },
  { key: "j", semitone: 10, type: "black" },
  { key: "m", semitone: 11, type: "white" },
  { key: ",", semitone: 12, type: "white" },
  { key: "l", semitone: 13, type: "black" },
  { key: ".", semitone: 14, type: "white" },
  { key: ";", semitone: 15, type: "black" },
  { key: "/", semitone: 16, type: "white" },
  { key: "q", semitone: 12, type: "white" },
  { key: "2", semitone: 13, type: "black" },
  { key: "w", semitone: 14, type: "white" },
  { key: "3", semitone: 15, type: "black" },
  { key: "e", semitone: 16, type: "white" },
  { key: "r", semitone: 17, type: "white" },
  { key: "5", semitone: 18, type: "black" },
  { key: "t", semitone: 19, type: "white" },
  { key: "6", semitone: 20, type: "black" },
  { key: "y", semitone: 21, type: "white" },
  { key: "7", semitone: 22, type: "black" },
  { key: "u", semitone: 23, type: "white" },
  { key: "i", semitone: 24, type: "white" },
  { key: "9", semitone: 25, type: "black" },
  { key: "o", semitone: 26, type: "white" },
  { key: "0", semitone: 27, type: "black" },
  { key: "p", semitone: 28, type: "white" },
  { key: "[", semitone: 29, type: "white" },
  { key: "=", semitone: 30, type: "black" },
  { key: "]", semitone: 31, type: "white" },
];

const instruments = {
  piano: {
    name: "大钢琴",
    description: "清晰敲击，短混响",
    category: "keys",
    gain: 0.42,
    attack: 0.008,
    decay: 0.34,
    sustain: 0.28,
    release: 0.82,
    filterType: "lowpass",
    filterFrequency: 7200,
    filterQ: 0.9,
    voices: [
      { type: "triangle", detune: 0, gain: 0.72 },
      { type: "sine", detune: 12, gain: 0.22 },
      { type: "square", detune: 0, gain: 0.05 },
    ],
    noise: { amount: 0.035, attack: 0.002, decay: 0.045 },
  },
  epiano: {
    name: "电钢琴",
    description: "温暖铃感，轻颤音",
    category: "keys",
    gain: 0.38,
    attack: 0.014,
    decay: 0.42,
    sustain: 0.42,
    release: 1.1,
    filterType: "lowpass",
    filterFrequency: 5200,
    filterQ: 1.1,
    voices: [
      { type: "sine", detune: 0, gain: 0.72 },
      { type: "triangle", detune: 1200, gain: 0.17 },
      { type: "sine", detune: 2400, gain: 0.08 },
    ],
    vibrato: { rate: 5.6, depth: 5 },
  },
  organ: {
    name: "风琴",
    description: "持续稳定，泛音丰富",
    category: "keys",
    gain: 0.32,
    attack: 0.035,
    decay: 0.08,
    sustain: 0.92,
    release: 0.42,
    filterType: "lowpass",
    filterFrequency: 6800,
    filterQ: 0.5,
    voices: [
      { type: "sine", detune: 0, gain: 0.58 },
      { type: "sine", detune: 1200, gain: 0.24 },
      { type: "triangle", detune: 1902, gain: 0.13 },
      { type: "square", detune: 2400, gain: 0.06 },
    ],
    vibrato: { rate: 6.2, depth: 4 },
  },
  synth: {
    name: "合成主音",
    description: "锐利穿透，适合旋律",
    category: "synth",
    gain: 0.3,
    attack: 0.018,
    decay: 0.18,
    sustain: 0.68,
    release: 0.36,
    filterType: "lowpass",
    filterFrequency: 3600,
    filterQ: 8,
    filterEnvelope: { attack: 0.06, decay: 0.32, sustain: 0.35, release: 0.26, amount: 4800 },
    voices: [
      { type: "sawtooth", detune: -8, gain: 0.42 },
      { type: "sawtooth", detune: 8, gain: 0.42 },
      { type: "square", detune: 0, gain: 0.16 },
    ],
    vibrato: { rate: 5.1, depth: 8 },
  },
  bass: {
    name: "合成贝司",
    description: "厚实低频，短促有力",
    category: "bass",
    gain: 0.46,
    octaveOffset: -1,
    attack: 0.006,
    decay: 0.16,
    sustain: 0.46,
    release: 0.24,
    filterType: "lowpass",
    filterFrequency: 920,
    filterQ: 6,
    filterEnvelope: { attack: 0.015, decay: 0.18, sustain: 0.2, release: 0.18, amount: 1800 },
    voices: [
      { type: "sawtooth", detune: -4, gain: 0.38 },
      { type: "square", detune: 0, gain: 0.42 },
      { type: "sine", detune: -1200, gain: 0.2 },
    ],
  },
  strings: {
    name: "弦乐组",
    description: "慢起音，宽阔铺底",
    category: "ensemble",
    gain: 0.28,
    attack: 0.26,
    decay: 0.52,
    sustain: 0.72,
    release: 1.7,
    filterType: "lowpass",
    filterFrequency: 4100,
    filterQ: 1.3,
    voices: [
      { type: "sawtooth", detune: -10, gain: 0.26 },
      { type: "sawtooth", detune: 9, gain: 0.26 },
      { type: "triangle", detune: 0, gain: 0.28 },
      { type: "sine", detune: 1200, gain: 0.12 },
    ],
    vibrato: { rate: 4.7, depth: 11 },
  },
  flute: {
    name: "长笛",
    description: "柔和气息，高频轻盈",
    category: "woodwind",
    gain: 0.31,
    attack: 0.12,
    decay: 0.18,
    sustain: 0.72,
    release: 0.72,
    filterType: "bandpass",
    filterFrequency: 2300,
    filterQ: 2.6,
    voices: [
      { type: "sine", detune: 0, gain: 0.8 },
      { type: "triangle", detune: 1200, gain: 0.14 },
    ],
    noise: { amount: 0.025, attack: 0.04, decay: 0.42, sustain: 0.08 },
    vibrato: { rate: 5.8, depth: 7 },
  },
  guitar: {
    name: "拨弦吉他",
    description: "快速衰减，带拨片感",
    category: "plucked",
    gain: 0.36,
    attack: 0.004,
    decay: 0.42,
    sustain: 0.16,
    release: 0.48,
    filterType: "lowpass",
    filterFrequency: 3600,
    filterQ: 1,
    voices: [
      { type: "triangle", detune: 0, gain: 0.62 },
      { type: "sawtooth", detune: 1200, gain: 0.18 },
      { type: "sine", detune: 1902, gain: 0.1 },
    ],
    noise: { amount: 0.045, attack: 0.001, decay: 0.035 },
  },
  marimba: {
    name: "马林巴",
    description: "木质短音，颗粒清楚",
    category: "mallet",
    gain: 0.45,
    attack: 0.003,
    decay: 0.34,
    sustain: 0.04,
    release: 0.36,
    filterType: "lowpass",
    filterFrequency: 4900,
    filterQ: 1.4,
    voices: [
      { type: "sine", detune: 0, gain: 0.56 },
      { type: "triangle", detune: 1200, gain: 0.28 },
      { type: "sine", detune: 2400, gain: 0.12 },
    ],
    noise: { amount: 0.028, attack: 0.001, decay: 0.025 },
  },
  brass: {
    name: "铜管",
    description: "明亮开口，适合和声",
    category: "brass",
    gain: 0.32,
    attack: 0.08,
    decay: 0.2,
    sustain: 0.72,
    release: 0.62,
    filterType: "lowpass",
    filterFrequency: 3100,
    filterQ: 3.2,
    filterEnvelope: { attack: 0.09, decay: 0.3, sustain: 0.48, release: 0.28, amount: 2600 },
    voices: [
      { type: "sawtooth", detune: -5, gain: 0.42 },
      { type: "sawtooth", detune: 5, gain: 0.34 },
      { type: "square", detune: 1200, gain: 0.12 },
    ],
    vibrato: { rate: 5.2, depth: 5 },
  },
  choir: {
    name: "人声合唱",
    description: "柔软宽厚，慢释放",
    category: "voice",
    gain: 0.24,
    attack: 0.2,
    decay: 0.34,
    sustain: 0.78,
    release: 1.55,
    filterType: "bandpass",
    filterFrequency: 1150,
    filterQ: 1.2,
    voices: [
      { type: "sine", detune: -7, gain: 0.35 },
      { type: "triangle", detune: 0, gain: 0.34 },
      { type: "sine", detune: 1200, gain: 0.18 },
      { type: "sine", detune: 1902, gain: 0.1 },
    ],
    vibrato: { rate: 4.3, depth: 8 },
  },
  kalimba: {
    name: "拇指琴",
    description: "晶亮金属，尾音轻快",
    category: "plucked",
    gain: 0.4,
    attack: 0.004,
    decay: 0.72,
    sustain: 0.12,
    release: 0.82,
    filterType: "highpass",
    filterFrequency: 220,
    filterQ: 0.8,
    voices: [
      { type: "sine", detune: 0, gain: 0.54 },
      { type: "sine", detune: 1200, gain: 0.24 },
      { type: "triangle", detune: 2400, gain: 0.16 },
    ],
    noise: { amount: 0.018, attack: 0.001, decay: 0.025 },
  },
};

const state = {
  audioContext: null,
  masterGain: null,
  dryGain: null,
  reverbGain: null,
  delayGain: null,
  delayNode: null,
  feedbackGain: null,
  analyser: null,
  convolver: null,
  currentInstrumentId: "piano",
  octave: 3,
  transpose: 0,
  volume: 0.78,
  tone: 0,
  sustain: false,
  activeNotes: new Map(),
  heldKeys: new Set(),
  sustainedVoices: new Set(),
  animationId: null,
};

const els = {
  activeInstrument: document.querySelector("#activeInstrument"),
  audioStatus: document.querySelector("#audioStatus"),
  audioToggle: document.querySelector("#audioToggle"),
  panicBtn: document.querySelector("#panicBtn"),
  keyboard: document.querySelector("#keyboard"),
  noteStrip: document.querySelector("#noteStrip"),
  scope: document.querySelector("#scope"),
  instrumentSelect: document.querySelector("#instrumentSelect"),
  instrumentGrid: document.querySelector("#instrumentGrid"),
  octaveControl: document.querySelector("#octaveControl"),
  octaveValue: document.querySelector("#octaveValue"),
  transposeControl: document.querySelector("#transposeControl"),
  transposeValue: document.querySelector("#transposeValue"),
  volumeControl: document.querySelector("#volumeControl"),
  volumeValue: document.querySelector("#volumeValue"),
  reverbControl: document.querySelector("#reverbControl"),
  reverbValue: document.querySelector("#reverbValue"),
  delayControl: document.querySelector("#delayControl"),
  delayValue: document.querySelector("#delayValue"),
  toneControl: document.querySelector("#toneControl"),
  toneValue: document.querySelector("#toneValue"),
  sustainToggle: document.querySelector("#sustainToggle"),
};

const keyMap = new Map(keyboardLayout.map((keyInfo) => [keyInfo.key, keyInfo]));
const semitoneElements = new Map();
const semitoneKeyLabels = new Map();
const ctx2d = els.scope.getContext("2d");

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function midiToName(midi) {
  const note = noteNames[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${note}${octave}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getAudioContext() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) {
    window.alert("当前浏览器不支持 Web Audio API。");
    return null;
  }

  if (!state.audioContext) {
    state.audioContext = new AudioCtor();
    buildAudioGraph();
  }

  return state.audioContext;
}

function buildAudioGraph() {
  const ctx = state.audioContext;
  state.masterGain = ctx.createGain();
  state.dryGain = ctx.createGain();
  state.reverbGain = ctx.createGain();
  state.delayGain = ctx.createGain();
  state.delayNode = ctx.createDelay(1.2);
  state.feedbackGain = ctx.createGain();
  state.analyser = ctx.createAnalyser();
  state.convolver = ctx.createConvolver();

  state.masterGain.gain.value = state.volume;
  state.dryGain.gain.value = 0.88;
  state.reverbGain.gain.value = Number(els.reverbControl.value);
  state.delayGain.gain.value = Number(els.delayControl.value);
  state.delayNode.delayTime.value = 0.28;
  state.feedbackGain.gain.value = 0.24;
  state.analyser.fftSize = 2048;
  state.convolver.buffer = createImpulseResponse(ctx, 1.9, 2.4);

  state.dryGain.connect(state.masterGain);
  state.reverbGain.connect(state.convolver);
  state.convolver.connect(state.masterGain);
  state.delayGain.connect(state.delayNode);
  state.delayNode.connect(state.feedbackGain);
  state.feedbackGain.connect(state.delayNode);
  state.delayNode.connect(state.masterGain);
  state.masterGain.connect(state.analyser);
  state.analyser.connect(ctx.destination);

  drawScope();
}

function createImpulseResponse(ctx, duration, decay) {
  const length = Math.floor(ctx.sampleRate * duration);
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      const fade = (1 - i / length) ** decay;
      data[i] = (Math.random() * 2 - 1) * fade;
    }
  }

  return impulse;
}

function createNoiseBuffer(ctx) {
  const length = Math.floor(ctx.sampleRate * 0.5);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function startAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;

  ctx.resume().then(() => {
    updateAudioStatus();
    warmClick();
  });
}

function warmClick() {
  const ctx = state.audioContext;
  if (!ctx || ctx.state !== "running") return;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.connect(state.dryGain);
  gain.disconnect();
}

function updateAudioStatus() {
  const isRunning = state.audioContext?.state === "running";
  els.audioStatus.classList.toggle("is-on", isRunning);
  els.audioStatus.querySelector("b").textContent = isRunning ? "已启动" : "未启动";
  els.audioToggle.textContent = isRunning ? "音频已就绪" : "启动音频";
}

function setInstrument(instrumentId) {
  if (!instruments[instrumentId]) return;
  state.currentInstrumentId = instrumentId;
  const instrument = instruments[instrumentId];

  els.activeInstrument.textContent = instrument.name;
  els.instrumentSelect.value = instrumentId;
  document.querySelectorAll(".instrument-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.instrument === instrumentId);
  });
}

function getAdjustedMidi(keyInfo) {
  const instrument = instruments[state.currentInstrumentId];
  const octaveOffset = instrument.octaveOffset || 0;
  return 12 * (state.octave + octaveOffset + 1) + keyInfo.semitone + state.transpose;
}

function playByKey(rawKey) {
  const key = rawKey.toLowerCase();
  const keyInfo = keyMap.get(key);
  if (!keyInfo || state.heldKeys.has(key)) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state !== "running") {
    ctx.resume().then(updateAudioStatus);
  }

  state.heldKeys.add(key);
  const midi = getAdjustedMidi(keyInfo);
  const voice = startNote(midi, key);
  const active = state.activeNotes.get(key) || [];
  active.push(voice);
  state.activeNotes.set(key, active);

  semitoneElements.get(keyInfo.semitone)?.classList.add("is-active");
  updateNoteStrip();
}

function releaseByKey(rawKey) {
  const key = rawKey.toLowerCase();
  const keyInfo = keyMap.get(key);
  if (!state.heldKeys.has(key)) return;

  state.heldKeys.delete(key);
  const voices = state.activeNotes.get(key) || [];

  if (state.sustain) {
    voices.forEach((voice) => state.sustainedVoices.add(voice));
  } else {
    voices.forEach(stopVoice);
  }

  state.activeNotes.delete(key);
  if (!isSemitoneStillHeld(keyInfo.semitone)) {
    semitoneElements.get(keyInfo.semitone)?.classList.remove("is-active");
  }
  updateNoteStrip();
}

function isSemitoneStillHeld(semitone) {
  return [...state.heldKeys].some((heldKey) => keyMap.get(heldKey)?.semitone === semitone);
}

function startNote(midi, sourceKey) {
  const ctx = state.audioContext;
  const instrument = instruments[state.currentInstrumentId];
  const now = ctx.currentTime;
  const frequency = midiToFrequency(midi);
  const noteGain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const panner = ctx.createStereoPanner();
  const oscillators = [];
  const auxNodes = [];

  noteGain.gain.setValueAtTime(0.0001, now);
  applyAmpEnvelope(noteGain.gain, now, instrument, instrument.gain);

  filter.type = instrument.filterType || "lowpass";
  const toneBoost = state.tone;
  const baseFilterFrequency = instrument.filterFrequency || 5000;
  const filterFrequency = clamp(baseFilterFrequency * 2 ** toneBoost, 80, 18000);
  filter.frequency.setValueAtTime(filterFrequency, now);
  filter.Q.value = instrument.filterQ || 1;

  if (instrument.filterEnvelope) {
    applyFilterEnvelope(filter.frequency, now, filterFrequency, instrument.filterEnvelope);
  }

  panner.pan.value = ((midi % 12) - 5.5) / 22;
  filter.connect(panner);
  panner.connect(noteGain);
  noteGain.connect(state.dryGain);
  noteGain.connect(state.reverbGain);
  noteGain.connect(state.delayGain);

  let vibratoOsc = null;
  let vibratoGain = null;
  if (instrument.vibrato) {
    vibratoOsc = ctx.createOscillator();
    vibratoGain = ctx.createGain();
    vibratoOsc.type = "sine";
    vibratoOsc.frequency.value = instrument.vibrato.rate;
    vibratoGain.gain.value = instrument.vibrato.depth;
    vibratoOsc.connect(vibratoGain);
    vibratoOsc.start(now);
    auxNodes.push(vibratoOsc, vibratoGain);
  }

  instrument.voices.forEach((voiceDef) => {
    const osc = ctx.createOscillator();
    const voiceGain = ctx.createGain();
    osc.type = voiceDef.type;
    osc.frequency.setValueAtTime(frequency, now);
    osc.detune.value = voiceDef.detune || 0;
    voiceGain.gain.value = voiceDef.gain;

    if (vibratoGain) {
      vibratoGain.connect(osc.detune);
    }

    osc.connect(voiceGain);
    voiceGain.connect(filter);
    osc.start(now);
    oscillators.push(osc);
    auxNodes.push(voiceGain);
  });

  if (instrument.noise) {
    const noiseSource = ctx.createBufferSource();
    const noiseFilter = ctx.createBiquadFilter();
    const noiseGain = ctx.createGain();
    noiseSource.buffer = createNoiseBuffer(ctx);
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1200;
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(instrument.noise.amount, now + instrument.noise.attack);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + instrument.noise.attack + instrument.noise.decay);
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(filter);
    noiseSource.start(now);
    noiseSource.stop(now + 0.5);
    auxNodes.push(noiseSource, noiseFilter, noiseGain);
  }

  const voice = {
    midi,
    sourceKey,
    noteGain,
    filter,
    oscillators,
    auxNodes,
    instrument,
    released: false,
  };

  return voice;
}

function applyAmpEnvelope(param, now, instrument, maxGain) {
  const attack = Math.max(instrument.attack, 0.001);
  const decay = Math.max(instrument.decay, 0.001);
  const sustain = clamp(instrument.sustain, 0.0001, 1);
  param.cancelScheduledValues(now);
  param.setValueAtTime(0.0001, now);
  param.exponentialRampToValueAtTime(Math.max(maxGain, 0.0001), now + attack);
  param.exponentialRampToValueAtTime(Math.max(maxGain * sustain, 0.0001), now + attack + decay);
}

function applyFilterEnvelope(param, now, baseFrequency, envelope) {
  const peak = clamp(baseFrequency + envelope.amount, 80, 18000);
  const sustainFrequency = clamp(baseFrequency + envelope.amount * envelope.sustain, 80, 18000);
  param.cancelScheduledValues(now);
  param.setValueAtTime(baseFrequency, now);
  param.exponentialRampToValueAtTime(peak, now + envelope.attack);
  param.exponentialRampToValueAtTime(sustainFrequency, now + envelope.attack + envelope.decay);
}

function stopVoice(voice) {
  if (!voice || voice.released) return;
  const ctx = state.audioContext;
  if (!ctx) return;

  const now = ctx.currentTime;
  const release = Math.max(voice.instrument.release, 0.04);
  const stopTime = now + release + 0.08;
  voice.released = true;
  state.sustainedVoices.delete(voice);

  voice.noteGain.gain.cancelScheduledValues(now);
  voice.noteGain.gain.setTargetAtTime(0.0001, now, release / 4);

  if (voice.instrument.filterEnvelope) {
    voice.filter.frequency.cancelScheduledValues(now);
    voice.filter.frequency.setTargetAtTime(
      clamp((voice.instrument.filterFrequency || 3000) * 0.7, 60, 16000),
      now,
      release / 3,
    );
  }

  voice.oscillators.forEach((osc) => {
    try {
      osc.stop(stopTime);
    } catch (error) {
      // Oscillators can only be stopped once; duplicate release events are ignored.
    }
  });

  setTimeout(() => {
    voice.oscillators.forEach((osc) => osc.disconnect());
    voice.auxNodes.forEach((node) => {
      try {
        node.disconnect();
      } catch (error) {
        // Some one-shot nodes may already be disconnected by the browser.
      }
    });
    voice.noteGain.disconnect();
    voice.filter.disconnect();
  }, (release + 0.18) * 1000);
}

function releaseSustainedVoices() {
  [...state.sustainedVoices].forEach(stopVoice);
  state.sustainedVoices.clear();
  updateNoteStrip();
}

function stopAllNotes() {
  state.activeNotes.forEach((voices) => voices.forEach(stopVoice));
  state.activeNotes.clear();
  releaseSustainedVoices();
  state.heldKeys.clear();
  semitoneElements.forEach((el) => el.classList.remove("is-active"));
  updateNoteStrip();
}

function updateNoteStrip() {
  const notes = [];
  state.activeNotes.forEach((voices) => {
    voices.forEach((voice) => notes.push(midiToName(voice.midi)));
  });
  state.sustainedVoices.forEach((voice) => notes.push(midiToName(voice.midi)));

  els.noteStrip.innerHTML = "";
  [...new Set(notes)].slice(0, 12).forEach((noteName) => {
    const pill = document.createElement("span");
    pill.className = "note-pill";
    pill.textContent = noteName;
    els.noteStrip.appendChild(pill);
  });
}

function drawScope() {
  if (!state.analyser) return;
  const buffer = new Uint8Array(state.analyser.fftSize);

  const draw = () => {
    const { width, height } = els.scope;
    state.analyser.getByteTimeDomainData(buffer);
    ctx2d.clearRect(0, 0, width, height);

    const gradient = ctx2d.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#37c3a2");
    gradient.addColorStop(0.5, "#e4c15f");
    gradient.addColorStop(1, "#e07055");

    ctx2d.lineWidth = 4;
    ctx2d.strokeStyle = gradient;
    ctx2d.beginPath();

    const slice = width / buffer.length;
    for (let i = 0; i < buffer.length; i += 1) {
      const value = buffer[i] / 128;
      const x = i * slice;
      const y = (value * height) / 2;
      if (i === 0) {
        ctx2d.moveTo(x, y);
      } else {
        ctx2d.lineTo(x, y);
      }
    }

    ctx2d.stroke();

    const activeCount = state.heldKeys.size + state.sustainedVoices.size;
    ctx2d.fillStyle = "rgba(242, 245, 247, 0.78)";
    ctx2d.font = "700 18px system-ui, sans-serif";
    ctx2d.fillText(`${activeCount} 个音符`, 28, 42);

    state.animationId = requestAnimationFrame(draw);
  };

  cancelAnimationFrame(state.animationId);
  draw();
}

function buildSemitoneLabels() {
  semitoneKeyLabels.clear();
  keyboardLayout.forEach((keyInfo) => {
    const labels = semitoneKeyLabels.get(keyInfo.semitone) || [];
    labels.push(keyInfo.key.toUpperCase());
    semitoneKeyLabels.set(keyInfo.semitone, labels);
  });
}

function getSemitoneLabel(semitone) {
  return (semitoneKeyLabels.get(semitone) || []).join(" ");
}

function renderKeyboard() {
  els.keyboard.innerHTML = "";
  semitoneElements.clear();
  buildSemitoneLabels();
  const pianoKeys = createPianoKeys();
  const whiteKeyCount = pianoKeys.filter((keyInfo) => keyInfo.type === "white").length;
  let whiteIndex = -1;

  pianoKeys.forEach((keyInfo) => {
    const keyButton = document.createElement("button");
    const midi = getAdjustedMidi(keyInfo);
    keyButton.type = "button";
    keyButton.className = `key ${keyInfo.type}`;
    keyButton.dataset.semitone = String(keyInfo.semitone);
    keyButton.innerHTML = `<span class="letter">${getSemitoneLabel(keyInfo.semitone)}</span><span class="note">${midiToName(midi)}</span>`;

    if (keyInfo.type === "white") {
      whiteIndex += 1;
      keyButton.style.left = `${(whiteIndex / whiteKeyCount) * 100}%`;
      keyButton.style.width = `${100 / whiteKeyCount}%`;
    } else {
      const center = ((whiteIndex + 1) / whiteKeyCount) * 100;
      keyButton.style.left = `${center}%`;
      keyButton.style.width = `${(100 / whiteKeyCount) * 0.62}%`;
    }

    keyButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      playBySemitone(keyInfo.semitone);
      keyButton.setPointerCapture?.(event.pointerId);
    });
    keyButton.addEventListener("pointerup", () => releaseBySemitone(keyInfo.semitone));
    keyButton.addEventListener("pointercancel", () => releaseBySemitone(keyInfo.semitone));
    keyButton.addEventListener("pointerleave", (event) => {
      if (event.buttons === 1) releaseBySemitone(keyInfo.semitone);
    });

    els.keyboard.appendChild(keyButton);
    semitoneElements.set(keyInfo.semitone, keyButton);
  });
}

function refreshKeyboardLabels() {
  createPianoKeys().forEach((keyInfo) => {
    const keyButton = semitoneElements.get(keyInfo.semitone);
    const letter = keyButton?.querySelector(".letter");
    const note = keyButton?.querySelector(".note");
    if (letter) letter.textContent = getSemitoneLabel(keyInfo.semitone);
    if (note) note.textContent = midiToName(getAdjustedMidi(keyInfo));
  });
}

function createPianoKeys() {
  const uniqueSemitones = [...new Set(keyboardLayout.map((keyInfo) => keyInfo.semitone))].sort((a, b) => a - b);
  return uniqueSemitones.map((semitone) => ({
    key: semitoneKeyLabels.get(semitone)?.[0]?.toLowerCase() || "",
    semitone,
    type: blackSemitones.has(semitone % 12) ? "black" : "white",
  }));
}

function playBySemitone(semitone) {
  const key = semitoneKeyLabels.get(semitone)?.[0]?.toLowerCase();
  if (key) playByKey(key);
}

function releaseBySemitone(semitone) {
  const labels = semitoneKeyLabels.get(semitone) || [];
  labels.forEach((label) => releaseByKey(label.toLowerCase()));
}

function renderInstrumentControls() {
  Object.entries(instruments).forEach(([id, instrument]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = instrument.name;
    els.instrumentSelect.appendChild(option);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "instrument-card";
    button.dataset.instrument = id;
    button.innerHTML = `<strong>${instrument.name}</strong><span>${instrument.description}</span>`;
    button.addEventListener("click", () => {
      setInstrument(id);
      refreshKeyboardLabels();
    });
    els.instrumentGrid.appendChild(button);
  });
}

function bindControls() {
  els.audioToggle.addEventListener("click", startAudio);
  els.panicBtn.addEventListener("click", stopAllNotes);

  els.instrumentSelect.addEventListener("change", (event) => {
    setInstrument(event.target.value);
    refreshKeyboardLabels();
  });

  els.octaveControl.addEventListener("input", (event) => {
    state.octave = Number(event.target.value);
    els.octaveValue.textContent = state.octave;
    refreshKeyboardLabels();
  });

  els.transposeControl.addEventListener("input", (event) => {
    state.transpose = Number(event.target.value);
    els.transposeValue.textContent = state.transpose > 0 ? `+${state.transpose}` : String(state.transpose);
    refreshKeyboardLabels();
  });

  els.volumeControl.addEventListener("input", (event) => {
    state.volume = Number(event.target.value);
    els.volumeValue.textContent = `${Math.round(state.volume * 100)}%`;
    if (state.masterGain) {
      state.masterGain.gain.setTargetAtTime(state.volume, state.audioContext.currentTime, 0.02);
    }
  });

  els.reverbControl.addEventListener("input", (event) => {
    const amount = Number(event.target.value);
    els.reverbValue.textContent = `${Math.round(amount * 100)}%`;
    if (state.reverbGain) {
      state.reverbGain.gain.setTargetAtTime(amount, state.audioContext.currentTime, 0.03);
    }
  });

  els.delayControl.addEventListener("input", (event) => {
    const amount = Number(event.target.value);
    els.delayValue.textContent = `${Math.round(amount * 100)}%`;
    if (state.delayGain) {
      state.delayGain.gain.setTargetAtTime(amount, state.audioContext.currentTime, 0.03);
    }
  });

  els.toneControl.addEventListener("input", (event) => {
    state.tone = Number(event.target.value);
    els.toneValue.textContent = state.tone > 0 ? `+${state.tone.toFixed(2)}` : state.tone.toFixed(2);
  });

  els.sustainToggle.addEventListener("click", () => {
    state.sustain = !state.sustain;
    els.sustainToggle.setAttribute("aria-pressed", String(state.sustain));
    if (!state.sustain) releaseSustainedVoices();
  });

  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    const target = event.target;
    const isEditable = target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;
    if (isEditable) return;

    if (event.code === "Space") {
      event.preventDefault();
      state.sustain = !state.sustain;
      els.sustainToggle.setAttribute("aria-pressed", String(state.sustain));
      if (!state.sustain) releaseSustainedVoices();
      return;
    }

    if (event.key === "Escape") {
      stopAllNotes();
      return;
    }

    if (keyMap.has(event.key.toLowerCase())) {
      event.preventDefault();
      playByKey(event.key);
    }
  });

  window.addEventListener("keyup", (event) => {
    if (keyMap.has(event.key.toLowerCase())) {
      event.preventDefault();
      releaseByKey(event.key);
    }
  });

  window.addEventListener("blur", stopAllNotes);
}

function boot() {
  renderInstrumentControls();
  renderKeyboard();
  bindControls();
  setInstrument(state.currentInstrumentId);
  refreshKeyboardLabels();
  updateAudioStatus();
  els.volumeValue.textContent = `${Math.round(state.volume * 100)}%`;
  els.reverbValue.textContent = `${Math.round(Number(els.reverbControl.value) * 100)}%`;
  els.delayValue.textContent = `${Math.round(Number(els.delayControl.value) * 100)}%`;
}

boot();
