# BlockNest
  Cryptocurrency Community Website that has millions of information 🍻

### Getting Start
#### Tech Stacks ⚙️
- PHP Vanilla (BackEnd)
- Python Flask (BackEnd)
- Ionic React (FrontEnd)
- Tailwind CSS
- MySQL (DB)
- Github (Version control)
- Github Action (CI/CD)
- Discord, Line (Communication Tools)

#### Project Folder Structure 📁
- blocknest-backend/
    - python/
      - database/
        - all python files
      - app.py 
    - uploads/
      - all image uploaded
    - all php files
- cypress/
    - Fixtures, Support
- dist/
    - Assets, index.html, manifest.json
- public/
    - App Logo, manifest.json
- src/
    - components/
      - context/
        - all context files 
      - all components files
    - pages/
      - all pages files 
    - theme/
      - variables.css
    - App.tsx, main.tsx and others 
- others

#### IDE Recommendation
- [PhpStorm](https://www.jetbrains.com/phpstorm/download/#section=windows)
  - [How to install](https://www.jetbrains.com/help/phpstorm/installation-guide.html#snap)
- [Visual Studio Code](https://code.visualstudio.com/download)
  - [How to install](https://code.visualstudio.com/docs)
 
#### Requirement
- PHP: 8.1
- Composer: 2.x
- [Python](https://www.python.org/downloads/)
- [MySQL](https://www.mysql.com/)
- [xampp](https://www.apachefriends.org/download.html)

#### Setup
The following steps may help you to host this project locally.
1. Clone the project
    ```bash
    git clone git@github.com:kevinsorensen523/BlockNest.git
    ```
2. Install node dependency and package
   ```bash
    npm install
    ```
3. Open localhost/phpmyadmin on Browser, then import tugas_akhir_if670.sql
4. Go to blocknest-backend/python directory to install python dependency and package
   ```bash
    cd blocknest-backend/python
    pip install flask
    pip install flask-cors
    pip install flask mysql-connector-python pandas
    ```
5. On blocknest-backend/python directory run :
   ```bash
   python app.py
   ```
   For Python3 run :
   ```bash
   python3 app.py
   ```
6. Open New Terminal and Run PHP Server on port 8000 (because flask default Port is already on 5000)
   ```bash
   php -S localhost:8000 -t blocknest-backend
   ```
7. Open New Terminal again and run :
   ```bash
   npm run dev
   ```
   
### Making Changes
#### For a new feature:
- On `main` branch
- Create a branch `feature/your-new-feature-name`
- Add your changes
- Send a pull request to the `main` branch

#### For a Bugfix:
- On `main` branch
- Create a branch `hotfix/your-hotfix-name`
- Add your changes
- Send a pull request to the `main` branch

#### Releasing / Deployment
1. Before merging development to production, append new CHANGELOG to explain what changes is being made
   1. Commit the changes with message `Update CHANGELOG BlockNest to x.x.x`
2. After merged to master, change the commit message to
   1. If releasing BlockNest `Release BlockNest x.x.x`
3. Create Release note and tag in gitlab for every release to production
   1. For BlockNest name the release title and tag with `vx.x.x`

### Contributor
Sweats and bloods. We want to appreciate and give credit to all men behind the Dashboard.
We have these geek guys to develop, maintain, and improve this project:
  1. Kevin Sorensen (Project Leader)
  2. Aleron Nathaniel Sutanto
  3. Agil Wira Pratama
  4. Vivo Hizkia Imanuel

## Changes Log 📜
### Version 1.0.0
🌟 Main Changes:
- Initial Commit
- Add Home Page
- Add Search Page
- Add Post
- Add Notification
- Add Profile Page
- Add Authentication Page

### Version 1.0.1
🌟 Main Changes:
- Add Mention Notification
- Add Donate With Ethereum
