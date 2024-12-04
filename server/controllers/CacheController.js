import express from 'express'
const { Request, Response } = express
import CacheManager from '../managers/CacheManager.js'

/**
 * @typedef RequestUserObject
 * @property {import('../models/User')} user
 *
 * @typedef {Request & RequestUserObject} RequestWithUser
 */

class CacheController {
  constructor() {}

  /**
   * POST: /api/cache/purge
   *
   * @param {RequestWithUser} req
   * @param {Response} res
   */
  async purgeCache(req, res) {
    if (!req.user.isAdminOrUp) {
      return res.sendStatus(403)
    }
    await CacheManager.purgeAll()
    res.sendStatus(200)
  }

  /**
   * POST: /api/cache/items/purge
   *
   * @param {RequestWithUser} req
   * @param {Response} res
   */
  async purgeItemsCache(req, res) {
    if (!req.user.isAdminOrUp) {
      return res.sendStatus(403)
    }
    await CacheManager.purgeItems()
    res.sendStatus(200)
  }
}
export default new CacheController()
