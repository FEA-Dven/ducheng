module.exports = {
  index: async function(ctx) {
    await ctx.render('food', {
      modules: [ctx.assets.food]
    })
  }
}