export const ScanResult = {
  NOTHING: 0,
  ADDED: 1,
  UPDATED: 2,
  REMOVED: 3,
  UPTODATE: 4
}

export const BookCoverAspectRatio = {
  STANDARD: 0, // 1.6:1
  SQUARE: 1
}

export const BookshelfView = {
  STANDARD: 0,
  DETAIL: 1
}

export const LogLevel = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  FATAL: 5,
  NOTE: 6
}

export const PlayMethod = {
  DIRECTPLAY: 0,
  DIRECTSTREAM: 1,
  TRANSCODE: 2,
  LOCAL: 3
}

export const AudioMimeType = {
  MP3: 'audio/mpeg',
  M4B: 'audio/mp4',
  M4A: 'audio/mp4',
  MP4: 'audio/mp4',
  OGG: 'audio/ogg',
  OGA: 'audio/ogg',
  OPUS: 'audio/ogg',
  AAC: 'audio/aac',
  FLAC: 'audio/flac',
  WMA: 'audio/x-ms-wma',
  AIFF: 'audio/x-aiff',
  WEBM: 'audio/webm',
  WEBMA: 'audio/webm',
  MKA: 'audio/x-matroska',
  AWB: 'audio/amr-wb',
  CAF: 'audio/x-caf',
  MPEG: 'audio/mpeg',
  MPG: 'audio/mpeg'
}
