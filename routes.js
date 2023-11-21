const express = require('express');
const Model = require('../model/model');
const router = express.Router()

module.exports = router;

//Post create Method
//Show the create page
router.get('/post', function(req, res){
    console.log("...Welcome to post newProduct page.");
    return res.status(200).render("newProduct");
});
//create Method
router.post('/post', async (req, res) => {
    const data = new Model({
        productName: req.body.productName,
        price: req.body.price,
        BestBeforeDate: req.body.BestBeforeDate
    });

    try {
        const dataToSave = await data.save();
        res.redirect("/api/post"); 
    }
    catch (error) {
        return res.redirect("/api/post"); 
    }
});
//Get all product and search data(home page)
router.get('/getAll', async (req, res) => {
    try {
        const query = {};//search data by some query conditions
        if (req.query.productName) {
            query.productName = req.query.productName;
        }
        if (req.query.price) {
            query.price = req.query.price;
        }

        const data = await Model.find(query);
        let html = `
        <div style="width: 100%; height: 100%; display: flex; justify-content: center;">
        <div>
        <style>
        table, th, td {
        border:1px solid black;
        }
        .button-container {
            display: flex;
        }
</style>
        <div class="jumbotron text-center">
            <h1>All Product</h1>
        </div>
            <table>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>BestBeforeDate</th>
                    <th>ID</th>
                </tr>
        `;
        data.forEach(item => {//displayed on the data in the table
            html += `
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.price}</td>
                    <td>${item.BestBeforeDate}</td>
                    <td>${item._id}</td>
                </tr>
            `;
        });
        html += `
            </table>
            
            <h2>Conditional Query</h2>
            <form action="getAll" method="get">
                <input type="text" style="width: 343px; height: 52px; border: 2px black solid;" placeholder="Product Name" name="productName">
                <br><br>
                <input type="text" style="width: 343px; height: 52px; border: 2px black solid;" placeholder="Price" name="price">
                <br><br>
                <button type="submit">search</button>
            </form>
            <div class="button-container">
            <form action="post" method="get">
                <button type="submit">Create</button>
            </form>
            <form action="delete" method="get">
                <button type="submit">Delete</button>
            </form>
            <form action="update" method="get">
            <button type="submit">Update</button>
        </form>
        </div>
        <form action="/login" method="get">
        <button type="submit">Logout</button>
    </form>
    </div>
        `;
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Update Method
//Show the Update page
router.get('/update', function(req, res){
    console.log("...Welcome to update page.");
    return res.status(200).render("update");
});
//Update by ID Method
router.post('/update', async (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = {
            productName: req.body.productName,
            price: req.body.price,
            BestBeforeDate: req.body.BestBeforeDate
        };
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(id, updatedData, options);
        res.redirect("/api/update");
    } catch (error) {
        res.redirect("/api/update");
    }
});
//Delete by ID Method
//Show the delete page
router.get('/delete', function(req, res){
    console.log("...Welcome to post delete page.");
    return res.status(200).render("delete");
});
//Delete one by ID Method
router.post('/delete', async (req, res) => {
    try {
        const id = req.body.id;
        const data = await Model.findByIdAndDelete(id);
        res.redirect("/api/delete");
    } catch (error) {
        res.redirect("/api/delete");
    }
});
//Delete All Method
router.post('/Alldelete', async (req, res) => {
    try {
        await Model.deleteMany({});
        res.redirect("/api/delete");
    } catch (error) {
        res.redirect("/api/delete");
    }
});
