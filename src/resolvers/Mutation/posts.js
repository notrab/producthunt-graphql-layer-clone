const slugify = require('slugify')
const cuid = require('cuid')
const { getUserId } = require('../../utils')

module.exports = {
  async createPost(_, { topics, ...args }, ctx, info) {
    const userId = await getUserId(ctx)

    return ctx.db.mutation.createPost(
      {
        data: {
          hunter: {
            connect: {
              id: userId
            }
          },
          votes: {
            create: [
              {
                user: {
                  connect: {
                    id: userId
                  }
                }
              }
            ]
          },
          topics: {
            connect: topics.map(id => ({ id }))
          },
          slug: `${slugify(args.name, { lower: true })}-${cuid.slug()}`,
          shortUrl: cuid(),
          ...args
        }
      },
      info
    )
  },

  async visit(_, { shortUrl }, ctx) {
    const post = await ctx.db.query.post({ where: { shortUrl } })

    if (!post) {
      throw new Error('Post not found')
    }

    await ctx.db.mutation.createVisit({
      data: {
        post: {
          connect: {
            id: post.id
          }
        }
      }
    })

    return {
      url: post.url
    }
  }
}
