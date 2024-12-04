import * as parseEpubMetadata from './parseEpubMetadata.js'
import * as parseComicMetadata from './parseComicMetadata.js'

/**
 * @typedef EBookFileScanData
 * @property {string} path
 * @property {string} ebookFormat
 * @property {string} ebookCoverPath internal image path
 * @property {import('../../scanner/BookScanner').BookMetadataObject} metadata
 */

/**
 * Parse metadata from ebook file
 * 
 * @param {import('../../models/Book').EBookFileObject} ebookFile 
 * @returns {Promise<EBookFileScanData>}
 */
export const parse = async (ebookFile) => {
  if (!ebookFile) return null

  if (ebookFile.ebookFormat === 'epub') {
    return parseEpubMetadata.parse(ebookFile)
  } else if (['cbz', 'cbr'].includes(ebookFile.ebookFormat)) {
    return parseComicMetadata.parse(ebookFile)
  }
  return null
}

/**
 * Extract cover from ebook file
 * 
 * @param {EBookFileScanData} ebookFileScanData 
 * @param {string} outputCoverPath 
 * @returns {Promise<boolean>}
 */
export const extractCoverImage = async (ebookFileScanData, outputCoverPath) => {
  if (!ebookFileScanData?.ebookCoverPath) return false

  if (ebookFileScanData.ebookFormat === 'epub') {
    return parseEpubMetadata.extractCoverImage(ebookFileScanData.path, ebookFileScanData.ebookCoverPath, outputCoverPath)
  } else if (['cbz', 'cbr'].includes(ebookFileScanData.ebookFormat)) {
    return parseComicMetadata.extractCoverImage(ebookFileScanData.path, ebookFileScanData.ebookCoverPath, outputCoverPath)
  }
  return false
}
