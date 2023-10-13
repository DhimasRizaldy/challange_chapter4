const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require("../../helpers/pagination");

module.exports = {
  // create new users
  createUsers: async (req, res, next) => {
    try {
      let { name, email, password, profile } = req.body;
      let users = await prisma.users.create({
        data: {
          name,
          email,
          password,
          profile: {
            create: profile,
          },
        },
      });

      res.status(201).json({
        status: true,
        message: "Created Users Succesfuly!",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },

  // get All Users
  getAllUsers: async (req, res, next) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      limit = Number(limit);
      page = Number(page);

      let users = await prisma.users.findMany({
        include: {
          profile: true,
          bank_accounts: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      const { _count } = await prisma.users.aggregate({
        _count: { id: true }
      });

      let pagination = getPagination(req, _count.id, page, limit);

      res.status(201).json({
        status: true,
        message: 'OK',
        data: { pagination, users }
      });
    } catch (err) {
      next(err);
    }
  },

  // get users detail data by: id
  getDetailUsers: async (req, res, next) => {
    try {
      let { id } = req.params;

      let users = await prisma.users.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          profile: true,
          bank_accounts: true,
        },
      });

      if (!users) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          data: 'No Users Found With Id ' + id
        });
      }

      res.status(200).json({
        status: true,
        message: 'OK',
        data: users
      });
    } catch (err) {
      next(err);
    }
  },

  // update data users
  updateUsers: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { name, email, password, profile } = req.body;

      let updateOperation = await prisma.users.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          password,
          profile: {
            create: profile,
          }
        },
        include: { profile: true },
      });

      res.status(200).json({
        status: true,
        message: "Updated Users Successfuly!",
        data: updateOperation,
      });
    } catch (err) {
      next(err);
    }
  },

  // delete users
  deleteUsers: async (req, res, next) => {
    try {
      let { id } = req.params;

      let deleteOperation = await prisma.users.delete({
        where: { id: Number(id) }
      });

      res.status(200).json({
        status: true,
        message: "Deleted Users Successfuly!",
        data: deleteOperation
      });
    } catch (err) {
      next(err);
    }
  }
};