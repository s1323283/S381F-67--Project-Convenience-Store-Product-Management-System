S381F-Project-Convenience Store Product Management System

Group: 67
Name: 
Lau Ho Tung (13233773),
Cheung Ka Hin (13232832)

Application link: https://projectsample381.render.com/

********************************************
# Login
Through the login interface, each user can access the Product information management system by entering their username and password.

Each user has a userID and password;
[
	{userid: Usera, password: cs381},
	{userid: Userb, password: cs381},
	{suerid: Userc, password: cs381}

]

After successful login, userid is stored in seesion. And a "Welcome back!" text will be show

********************************************
# Logout
In the home page, each user can log out their account by clicking logout.

********************************************
# CRUD service
- Create
-	A Product document may contain the following attributes with an example: 
	1)	Product Name (tea)
	2)	Product ID(65587688e0cdf4ab78d92ac)
	3)	Price (12)
	4)	Best before date (120724) Best before date must be 6 digits
	
Product Name and Product ID is mandatory, and other attributes are optional.

Create operation is post request, and all information is in body of request.

********************************************
# CRUD service
- Read
-  There are two options to read and find product list all information or searching by product id.

1) List all information
	display.ejs will be displayed with all product ID;
	clicking on product ID, the details will be shown;

2) Searching by product id
	input id of product you want to find (65587688e0cdf4ab78d92ac);
	id is in the body of post request, and in display.ejs restaurant id will be shown as link;
	clicking on product ID, the details will be displayed;

********************************************
# CRUD service
- Update
-	The user can update the product information through the details interface.
-	Among the attribute shown above, product ID and Best before date cannot be changed. Since product ID is fixed, product ID is searching criteria for updating information. 

-	A product document may contain the following attributes with an example: 
	1)	Product Name (tea)
	2)	Price (12)

	In example, we updated the product name and price.

********************************************
# CRUD service
- Delete
-	The user can delete the product information through the details interface.

********************************************
# Restful
In this project, there are three HTTP request types, post, get and delete.
- Post 
	Post request is used for insert.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X POST -H "Content-Type: application/json" --data '{"name": "Taro & Tea", "restaurangID":"00000004"}'localhost:8099/api/item/restaurantID/00000004/name/Taro & Tea

- Get
	Get request is used for find.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X GET http://localhost:8099/api/item/restaurantID/00000002

- Delete
	Delete request is used for deletion.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X DELETE localhost:8099/api/item/restaurantID/00000002

For all restful CRUD services, login should be done at first.


curl -X POST -H "Content-Type: application/json" --data '{"name": "Taro & Tea", "restaurangID":"00000004"}' http://localhost:8099/api/item/restaurantID/00000004

curl -X GET http://localhost:8099/api/item/restaurantID/00000002

curl -X DELETE http://localhost:8099/api/item/restaurantID/00000002
