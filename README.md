# Blog Manager

A simple web application to manage blog posts, featuring random dog images fetched from the [Dog CEO API](https://dog.ceo/dog-api/). Built using vanilla HTML, CSS, and JavaScript with a mock REST API powered by [JSON Server](https://github.com/typicode/json-server).

---

##  Features

- View all blog post titles with cute dog images
- Click to view post details (title, content, author, and image)
- Add a new blog post (automatically fetches a random dog image)
- Edit existing posts (title and content)
- Delete posts
- All CRUD operations persist to a local JSON API

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lewys-miugo/blog-post-manager.git
cd blog-post-manager
```
### 2. Installing JSON Server
```
npm install -g json-server@0.17.4
```

#### 3. Run the JSON Server
```
json-server db.json
```

#### 4. Start Live Server

## License
MIT License — feel free to clone, modify, and share.