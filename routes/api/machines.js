const express = require("express");
const router = express.Router();

const Machine = require("../../models/Machine");

// @route GET api/machines/getAll
// @desc Get all machines
// @access at the moment - public
router.get("/getAll", (req, res) => {
    Machine.find({}).then(machines => res.json(machines));
}
);

router.post("/newMachine", (req, res) => {

    Machine.findOne({ id: req.body.id }).then(machine => {
      if (machine) {
        return res.status(400).json({ id: "Machine already exists" });
      } else {
        const newMachine = new Machine({
          id: req.body.id,
          name: req.body.name,
          gradrequired: req.body.gradrequired,
          billingcoderequired: req.body.billingcoderequired
        });

        newMachine.save().then(machine => res.json(machine));
      }
    });
  });

// @route POST api/machines/findMachine
// @desc Find a machine by calendar id
// @access Public
router.post("/findMachine", (req, res) => {
  Machine.findOne({ id: req.body.resourceId }).then(machineref => {
    if (machineref) {
      return res.json(machineref);
    }
  });
});

router.patch("/update", (req, res) => {
  let machineFields = {};

  machineFields.id = req.body.id;
  machineFields.name = req.body.name;
  machineFields.gradrequired = req.body.gradrequired;
  machineFields.billingcoderequired = req.body.billingcoderequired;

  Machine.findOneAndUpdate(
    { _id: req.body._id },
    { $set: machineFields },
    { new: true }
  )
  .then(machine => {
    res.json(machine);
  })
  .catch(err => console.log(err));
});

router.delete("/delete/:id", (req, res) => {
  Machine.findById(req.params.id).then(machine => {
    machine.remove().then(() => res.json({success: true}));
  });
});

module.exports = router;
