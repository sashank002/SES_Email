var AWS = require("aws-sdk");

const firstTemplate = require("../template/first");

exports.sendMail = async (req, res) => {
  try {
    const emailIds = req.body.emailIds;

    var params = {
      Source: "no-message@acadio.in" /* required */,
      Destination: {
        ToAddresses: [...emailIds],
      },
      Template: "chequeTemplate5" /* required */,
      TemplateData: '{ "name":"sashank" }',
      ReplyToAddresses: [
        "parmarsatvan@gmail.com",
        /* more items */
      ],
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendTemplatedEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data) {
        console.log(data.MessageId);
        res.status(200).json({
          status: true,
          data: data,
        });
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
