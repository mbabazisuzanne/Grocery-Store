const router = require("express").Router();
const categoryControllers = require("../controllers/category");

router.post("/new-category", categoryControllers.newCategory);
router.get("", categoryControllers.getCategories);
router.delete("/:categoryId", categoryControllers.deleteCategories);

module.exports = router;
