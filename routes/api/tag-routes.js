const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => [console.log(err), res.status(500).json(err)]);
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one tag by its `id` value
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "There were no tags found with this id." });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => [console.log(err), res.status(500).json(err)]);
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => [console.log(err), res.status(500).json(err)]);
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Tag.update(
    {
      category_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "There were no tags found with this id." });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "There were no tags found with this id." });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;