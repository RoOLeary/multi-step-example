(function ( $ ) {
    $.fn.multiStepForm = function(args) {
        if(args === null || typeof args !== 'object' || $.isArray(args))
            throw  " : Called with Invalid argument";
            
        var form = this;
        var steps = form.find('.step');
        
        form.stepTo = function (i) {
            
            // Adds class 'active' to the the active step
            steps.removeClass('active').eq(i).addClass('active');
            
            // Show only the navigation buttons that make sense for the active section
            // i.e. if it needs "Next" or "Submit", based on the length.
            // set up a check to what step we're on
            
            let lastStep = i >= steps.length - 1;
            form.find('.next').toggle(!lastStep);
            form.find('.submit').toggle(lastStep);
            
            return form;
        }

        function activeIndex() {
            //  Return the active index by looking at which section has the class 'active'
            return steps.index(steps.filter('.active'));
        }
      
        //  Next button goes forward if active block validates
        form.find('.next').click(function() {
            if('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)){
            if(!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)){
                form.validate(args.validations);
                if(form.valid() == true){
                    form.stepTo(activeIndex() + 1);
                    return true;
                }
                    return false;
                }
            }
            form.stepTo(activeIndex() + 1);
        });

        form.find('.submit').on('click', function(e){
            // this is kind of what I meant with the preventing default
            e.preventDefault(); 
            if(typeof args.beforeSubmit !== 'undefined' && typeof args.beforeSubmit !== 'function')
                args.beforeSubmit(form, this);
                //  check if args submit is set false.
                //  submit wom't execute if its not  
                if(typeof args.submit === 'undefined' || (typeof args.submit === 'boolean' && args.submit)){ 

                    let formData = form.serializeArray();
                    // submit or send to another function to carry on with data transit
                    dispatch(formData);
                }
            return form;
        });

        function dispatch(data){
            
            console.log('serialized form data: ', data);
            // trigger actual submission here
            // uncomment to see validation in action
            form.submit(); 
            
        }

        // By default, navigate to the first slide if it is being set using defaultStep property
        typeof args.defaultStep === 'number' ? form.stepTo(args.defaultStep) : null;
            form.noValidate = function() {
            }
        return form;
    };
}( jQuery ));