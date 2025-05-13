# URL Shortener | ReactJS
Analogue to https://bitly.com.
The main idea is - users will be able to save a long link and use a shortened version instead.
Basically visiting the shortened link will redirect you to the original one.
Apart from the main functionality the link owner will be able to collect the statistics about how many visits that link had. 
The short link will not be accessible after 1 month from the last visit etc
<details>
  
  <summary>Project setup and start</summary>

1. Clone the repo with `git clone https://github.com/sergiy17/url-shortener-react.git`
2. Install dependencies `npm install`
3. `npm start`
</details>

<details>
  <summary>Requests examples and screenshots</summary>

Links list page
```
GET to http://localhost:3006/links
```

<img width="1312" alt="Image" src="https://github.com/user-attachments/assets/c0155b6a-18b4-427a-98c8-aa64835d7255" />

same page with pagination

<img width="1309" alt="Image" src="https://github.com/user-attachments/assets/839848a6-caff-426c-b01a-5538bfc43cba" />

Links show page
```
GET to http://localhost:3006/links/SOME_SLUG
```

<img width="1309" alt="Image" src="https://github.com/user-attachments/assets/24883d17-fe67-49f5-9bfc-12698e9cf0b7" />

New Shortened URL page
```
GET to http://localhost:3006
```

<img width="1298" alt="Image" src="https://github.com/user-attachments/assets/4ed3174f-1036-441c-a223-05f8f9b61b63" />

</details>
