# Multi-step with validation

A simple, but better example of what I meant on Thursday morning. 

Your workflow is already mostly correct, however, I'd consider splitting this out, dividing the form into its steps, and validating on "Next" click. When the form submit method is triggered, it will only do so once all validations pass on required fields, and not before. 

So basically, you're able to collect and append the data on each step, which is just a click, not a submit. Only when we've gotten to the last step, does the actual "Submit" button render. 

I've added an example of using jQuery validation plugin and setting some custom validation rules. 

Full disclosure: Haven't used jQuery in a LONG time, so this could be a bit rusty. Lastly, am logging out the serialized form data on "submit. But on actual submission, you can send that formdata onward. 