# HW#3: Protractor e2e tests: part #2

## :link: Prerequisites

1. Checkout to `master` branch and pull the latest changes
```
    git checkout master
    git pull origin master
```   
2. Create new branch from `master`: `protractor2-surname`

## :books: Tasks:

In this branch - cover test case by e2e test with Protractor.

### :pencil: TestCase

**Preconditions:**
1. Open [Matrix page](https://www.gapminder.org/dollar-street/matrix)

**Steps:**
1. Choose any family
2. Click on the selected family card

<img src="/homework/assets/hw3_1.png" alt="HW3.1" width="40%">

3. Remember the following family values:
   - name
   - income
   - country
4. Click on 'Visit this home' button

<img src="/homework/assets/hw3_2.png" alt="HW3.2" width="40%">

5. Look at the main description section 

<img src="/homework/assets/hw3_3.png" alt="HW3.3" width="40%">

**Expected result:** name, income and country values should match the values from the previous page.

5. Scroll down
6. Look at the sticky header

<img src="/homework/assets/hw3_3.png" alt="HW3.4" width="40%">

**Expected result:** all our values, such as name, income, country, should be the same as we have on the previous steps.

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
    git commit -m "tests(e2e): add protractor tests - HW3"
    git push origin `protractor2-surname`
```
5. Create Pull Request with your changes from `protractor2-surname` to `master`, add _'Ready for review'_ label, add yourself as Assignees
6. Post update that you've finish your HW3 in [summarized table](https://docs.google.com/spreadsheets/d/1pIVFmzoo6lkchfcUjxpUFov7u7m09iY_4knNajdR9SU/edit?usp=sharing) and into the [#hw-review-request](https://valorsoftware-qa2020.slack.com/archives/CUC73SVC4) chat.
