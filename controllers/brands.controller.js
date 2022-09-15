const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  try {
    const {
      name,
      email,
      logo,
      region,
      language,
      desc,
      salesPhase,
      budget,
      isVetted,
      pdfAudit,
      pdfReview,
      profileLive,
    } = req.body
    const newAccount = await prisma.account.create({
      data: {
        name,
        email,
        logo,
        region,
        language,
      },
    })
  
    const newBrand = await prisma.brand.create({
      data: {
        accountId: newAccount.id,
        desc,
        salesPhase,
        budget,
        isVetted,
        pdfAudit,
        pdfReview,
        profileLive,
      },
    })
  
    const brand = await prisma.brand.findUnique({
      where: {
        id: newBrand.id,
      },
      include: {
        account: true,
      },
    })
  
    res.json(brand)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getList = async (req, res) => {
  try {
    // To Do:
    const brands = await prisma.brand.findMany({
      include: {
        account: true,
      },
    })

    res.json(brands)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  store,
  getList,
}