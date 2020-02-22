# HW#2: Protractor e2e tests

## :link: Prerequisites

1. You should have already cloned repository.
2. You should have already created branch `protractor-surname`.
3. You should have already created test files in this branch from practical lesson.
4. You should have already committed and pushed all these files to your remote branch. 
If not, plz do it:
```
    git add .
    git commit -m "tests(e2e): add protractor tests from practical lections"
    git push origin protractor-surname
 ``` 
And check that your changes were committed:
```
    git status
    git log
    q
 ```
###### Note: `q` closes log view.

## :books: Tasks:

In this branch - cover test case by e2e test with Protractor.

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

<img src="/homework/assets/hw2_1.png" alt="HW2.1" width="40%">

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

<img src="/homework/assets/hw2_2.png" alt="HW2.2" width="40%">

----

### :pencil: TestCase #3

**Preconditions:**
1. Log into the system
2. Open [Profile page](https://www.freelancer.com/u/{username})
3. Switch to edit profile mode

**Steps:**
1. Click on '+Skills' in 'My Top Skills' section
2. Add SEO, HTML5 skills
3. Save changes in the form
4. Click on 'Updates' in navigation
5. Switch to 'Filters' mode

**Expected result:** added skills on step2,3 are shown in the skills list of updates section.

<img src="/homework/assets/hw2_3.png" alt="HW2.3" width="70%">

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
    git add .
    git commit -m "tests(e2e): add protractor tests - HW2"
    git push origin `protractor-surname`
```
5. Create Pull Request with your changes from `protractor-surname` to `master` and add _'Ready for review'_ label.
6. Post update that you've finish your HW2 in [summarized table](https://docs.google.com/spreadsheets/d/1pIVFmzoo6lkchfcUjxpUFov7u7m09iY_4knNajdR9SU/edit?usp=sharing) and into the [#hw-review-request](https://valorsoftware-qa2020.slack.com/archives/CUC73SVC4) chat.
