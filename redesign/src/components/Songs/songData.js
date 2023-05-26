export const keyOptions = [
  'A', 'Am', 'Bb', 'Bbm', 'B', 'Bm', 'C', 'Cm', 'C#', 'C#m', 'D', 'Dm',
  'Eb', 'Ebm', 'E', 'Em', 'F', 'Fm', 'F#', 'F#m', 'G', 'Gm', 'Ab', 'Abm'
];

export const singerOptions = [
  'Carl',
  'Mike',
  'Instrumental'
];

export const instrumentOptions = [
  '',
  'Bass',
  'Banjo',
  'Mandolin',
  'Fiddle',
  'Guitar',
  'Lap Steel',
  'Electric',
  'Harmonica',
  'Kit',
  'Cajon',
];

export const getNewSong = () => ({
  title: '',
  key: 'C',
  carl: 'Guitar',
  mike: 'Mandolin',
  singer: 'Carl'
});