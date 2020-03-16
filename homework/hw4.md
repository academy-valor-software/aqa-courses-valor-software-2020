# HW#4: Cypress e2e tests

## :link: Prerequisites

1. Checkout to `master` branch and pull the latest changes
```
    git checkout master
    git pull origin master
```   
2. Create new branch from `master`: `cypress-surname`

## :books: Tasks:

In this branch - cover test case by e2e test with Cypress.

### :pencil: TestCase #1

**Preconditions:**
1. Open [Login page](https://www.freelancer.com/login)

**Steps:**
1. Set email with invalid format
2. Set correct password
3. Click on "Log In" button

**Expected result:** 
- url still contains /login route;
- error message appears and it equals to _'Please enter a valid username or email address.'_

<img src="/homework/assets/hw2_2.png" alt="HW2.1" width="40%">

-----

### :pencil: TestCase #2

**Preconditions:**
1. Open [Login page](https://www.freelancer.com/login)

**Steps:**
1. Set correct email.
2. Set incorrect password
3. Click on "Log In" button

**Expected result:** 
- url still contains /login route;
- error message appears and it equals to _'Incorrect username or password provided.'_

<img src="/homework/assets/hw2_1.png" alt="HW2.2" width="40%">

----

## :mailbox_with_mail: Preparing and sending results:

1. Check yourself - run your tests, review your code.
2. Check that your changes are ready to commit:
```
    git status
```
3. Check that you're still on your branch:
```
    git branch
```
4. Commit your new tests with new commit:
```
    git add filename1.extension filename2.extension
    git commit -m "tests(e2e): add cypress tests - HW4"
    git push origin `cypress-surname`
```
5. Create Pull Request with your changes from `cypress-surname` to `master`, add _'Ready for review'_ label, add yourself as Assignees
6. Post update that you've finish your HW4 in [summarized table](https://docs.google.com/spreadsheets/d/1pIVFmzoo6lkchfcUjxpUFov7u7m09iY_4knNajdR9SU/edit?usp=sharing) and into the [#hw-review-request](https://valorsoftware-qa2020.slack.com/archives/CUC73SVC4) chat.
