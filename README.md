This is backend,
Here I installed all dependicies needed for the application and i created db.json inside root file then inside the db.json file i have given books = empty array so that we can store the book details then i created schema types
which is needed for the backend structure and then folder structure was inside src folder it is inside types folder then defines all types for books,chapters,versions,index then imported in index.ts so that we can use all types
in one import for different files then i have created db.ts inside config file to intiliaze db.json file then created storage service inside services folder here to create a storage folder inside that storage folder books
folder like that ,inside storage service file i have created many functions to initiliaze versions paths etc. then i created book schema types,then initialized inside bookservice.ts which is inside services folder
that services file include the functionality of books and other logics inside it so that we can use inside controllers to initialize the logic inside it  then controller to routes then defines all routes then call inside
server.ts which is the root file of the folder then run using npm run dev,
the backend is working by this steps:

Video Link:
