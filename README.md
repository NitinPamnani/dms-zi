### dms-zi

- A simple Document management system using nodeJs and mongo
- Download the zip or take a pull of the repo
- Navigate to the dm-zi directory.
- Make sure to use Node version `20.6.1`
- Run this command - `npm install`
- Check if nodemon is installed using the command - `nodemon -v`
- If not present, install using `npm install --global nodemon`
- It should give an output like this 
<code>	Pinged your deployment. You successfully connected to dms MongoDB!
REST serving at 5001
gRPC serving at 5002</code>
- REST and gRPC are being served on diff ports independently but they call the same use cases.
- Please see that config, private and public keys need to be added separately
