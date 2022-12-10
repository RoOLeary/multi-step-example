# Multi-step with validation

A simple, but better example of what I meant on Thursday morning. 

The workflow is already mostly correct, however, I'd consider splitting this out, dividing the form into its steps, and validating on "Next" click. When the form submit method is triggered, it will only do so once all validations pass. 

And only when we've gotten to the last step, does the actual "Submit" form render. I've added an example of using jQuery validation plugin. Full disclosure: Haven't used jQuery in a LONG time, so this could be a bit rusty.

Logging out the serialized form data. But on submission, you can more or less take it from there. 
