import * as service from '../services/user.service.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await service.getAll()
    res.status(200).send({
      status: 'success',
      payload: users,
    })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await service.getById(id)
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
    } else {
      res.status(200).send(user)
    }
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const user = req.body
    const newUser = await service.create(user)
    res.status(201).send({
      message: 'User created successfully',
      user: newUser,
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = req.body
    const updatedUser = await service.update(id, user)
    if (updatedUser) {
      res.status(200).send(updatedUser)
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedUser = await service.remove(id)
    if (deletedUser) {
      res.status(200).send({
        message: `User ${id} deleted successfully`,
      })
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    next(error)
  }
}
