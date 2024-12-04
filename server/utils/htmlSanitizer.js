import sanitizeHtml from 'sanitize-html'
import { entities } from './htmlEntities.js'

export function sanitize(html) {
  const sanitizerOptions = {
    allowedTags: [
      'p', 'ol', 'ul', 'li', 'a', 'strong', 'em', 'del', 'br'
    ],
    disallowedTagsMode: 'discard',
    allowedAttributes: {
      a: ['href', 'name', 'target']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false
  }

  return sanitizeHtml(html, sanitizerOptions)
}

export function stripAllTags(html, shouldDecodeEntities = true) {
  const sanitizerOptions = {
    allowedTags: [],
    disallowedTagsMode: 'discard'
  }

  let sanitized = sanitizeHtml(html, sanitizerOptions)
  return shouldDecodeEntities ? decodeHTMLEntities(sanitized) : sanitized
}

export function decodeHTMLEntities(strToDecode) {
  return strToDecode.replace(/\&([^;]+);?/g, function (entity) {
    if (entity in entities) {
      return entities[entity]
    }
    return entity;
  })
}
