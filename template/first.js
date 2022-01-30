const firstTemplate = {
  Template: {
    TemplateName: "chequeTemplate5",
    SubjectPart: "Hi, {{name}} marked",
    HtmlPart:
      '<!DOCTYPE html>< html lang="en" ><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><div><h1> hello {{ name }} </h1><h3> we are glad to inform you that you have won the ₹ 1 lakhs </h3></div></body></html>',
    TextPart: "hello test email",
  },
};

module.exports = firstTemplate;
