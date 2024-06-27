# worko.ai
Internship task

# Worko.ai
Backend Internship
NodeJs assignment
# OVERVIEW
Worko is hiring API developer interns in NodeJs. Candidates are requested to complete this assignment before applying for this internship. Applications without assignment will not be entertained.
# GOALS
Assess candidate code writing for backend services skills
Candidate self learning skills and managing delivery skills
# SPECIFICATIONS
Worko is building a product to help Job seekers to request for referral from multiple companies they are interested to work in. They can use any job description url to request referral for. At the same time candidates have options for requests for services like resume review, interview handhold, career guidance, mock interview.
# MILESTONES
Backend API Setup
* Create a NodeJs project with MVC architecture
* Create controller layer
* Create Service layer
* Create DAO layer
* Create Models for CRUD operations
* Create DTO for Request and response
* Add Validator framework
# Create API:
Create API for resource /worko/user
* GET – list user
* GET - /worko/user/:userId - get user details
* POST -  create user
* PUT - update user
* PATCH - update user
* DELETE - soft delete user in DB
# Required Payload for User
* Id (Generated)
* Email
* Name
* Age
* City
* Zip code
# Validate following fields on API call
* Email
* Zip Code
* Id - in case of POST/PUT/DELETE
# Persist User Information in Database
* Choose DB of your choice (NoSql is preferred)
* Read DB config from Environment variable
Write Unit tests with at least 60% coverage
Prepare Readme/getting started guide 
Authentication
Implement basic authentication for all the APIs
# Node Module
* Express
* Joi
* Webpack
* dotenv

Note: Adding more feature is welcome