import { UserModel } from '../daos/mongodb/models/user.model.js'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const getAll = async () => {
  try {
    return await UserModel.find().exec()
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`)
  }
}

export const getById = async (id) => {
  try {
    return await UserModel.findById(id).exec()
  } catch (error) {
    throw new Error(`Error retrieving user with id ${id}: ${error.message}`)
  }
}

export const create = async (createUserDto) => {
  try {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS
    )
    createUserDto.password = hashedPassword

    const createdUser = new UserModel(createUserDto)
    return await createdUser.save()
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`)
  }
}

export const update = async (id, updateUserDto) => {
  try {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        SALT_ROUNDS
      )
      updateUserDto.password = hashedPassword
    }
    return await UserModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).exec()
  } catch (error) {
    throw new Error(`Error updating user with id ${id}: ${error.message}`)
  }
}

export const remove = async (id) => {
  try {
    return await UserModel.findByIdAndRemove(id).exec()
  } catch (error) {
    throw new Error(`Error deleting user with id ${id}: ${error.message}`)
  }
}
