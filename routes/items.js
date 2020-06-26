const router = require("express").Router();
const itemControllers = require("../controllers/item");

router.post("/new-item", itemControllers.addNewItem);
router.get("", itemControllers.getItems);
router.delete("/:itemId", itemControllers.deleteItem);
router.put("/:itemId", itemControllers.updateItem);
router.get("/:itemId", itemControllers.bringItem);

module.exports = router;
