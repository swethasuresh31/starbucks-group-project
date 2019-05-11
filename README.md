# starbucks-group-project
### Feature Set
- Signup: The user can select a username and password. The password will be encrypted and stored in the database using b-crypt function.
- Login: The user must enter the signed up username and password information. After validation of the username and password, the user will be authenticated for further operations.
- Add Card: The input for this API will be the username, card Id, card code and balance. The card will be stored in the database if all the mentioned details are valid.
- Payments: The input for this API will be username, card Id, code code, name of the product purchased and the price of the product. The card will be charged if all mentioned details are valid.
- Manage Orders: The input for this API is of two types. If just the username is passed as input, all the order details of that username is retrieved. In addition to the username, if the to and from dates are specified, orders between those dates can be retrieved.

### Project Board, Project Journal, Sprint Task Sheet, Burndown Chart:

Please refer file from this directory for all the details: /starbucks/documentation/202 Project documentation.xlsx

### Architecture Diagram:



* AWS Container Deployment Diagram

![Alt deployment-diagram](starbucks/documentation/container-deployment-diagram.png?raw=true "AWS Container deployment diagram")
