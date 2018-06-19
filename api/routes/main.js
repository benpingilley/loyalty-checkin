const appRoot = require('app-root-path');
// External Modules
const router = require('koa-router')();
// Function Modules
const mongo = require(`${appRoot}/modules/mongo`);

// Check if phone number exists
router.get('/checkin/:phone', async (ctx, next) => {
  const phone = ctx.params.phone;
  const exists = await mongo.checkPhoneNumber(phone);
  if (exists) {
    const timeSince = Date.now() - exists.lastModified;
    if (timeSince > 3000) { // 300000 ms = 5 minutes
      mongo.customerCheckin(exists);
      ctx.body = await mongo.checkPhoneNumber(phone);
    } else {
      ctx.status = 202;
      ctx.body = 'Must wait 5 minutes before checking in again';
    }
  } else {
    ctx.status = 204;
    ctx.body = 'Customer does not exist';
  }
});

// Insert customer
router.post('/newcustomer', async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = await mongo.newCustomer(
    ctx.request.body
  );
});

module.exports = router;
