(function ( $ ) {
    $.fn.multiStepForm = function(args) {
        if(args === null || typeof args !== 'object' || $.isArray(args))
            throw  " : Called with Invalid argument";
            
        var form = this;
        var steps = form.find('.step');
        
        form.navigateTo = function (i) {/*index*/
            
            // Adds class 'current' to the the current step
            
            steps.removeClass('current').eq(i).addClass('current');
            
            // Show only the navigation buttons that make sense for the current section
            // i.e. if it needs "Next" or "Submit", based on the length.
            
            let lastStep = i >= steps.length - 1;
            form.find('.next').toggle(!lastStep);
            form.find('.submit').toggle(lastStep);
            
            return form;
        }
        function currentIndex() {
            //  Return the current index by looking at which section has the class 'current'
            return steps.index(steps.filter('.current'));
        }
      
        //  Next button goes forward if current block validates
        form.find('.next').click(function() {
            if('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)){
            if(!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)){
                form.validate(args.validations);
                if(form.valid() == true){
                    form.navigateTo(currentIndex() + 1);
                return true;
                }
                return false;
                }
            }
            form.navigateTo(currentIndex() + 1);
        });

        form.find('.submit').on('click', function(e){
            
            // this is kind of what I meant with the preventing default
            e.preventDefault(); 
            
            if(typeof args.beforeSubmit !== 'undefined' && typeof args.beforeSubmit !== 'function')
                
                args.beforeSubmit(form, this);
                //  check if args.submit is set false.
                //  submit wom't execute if its not  
                if(typeof args.submit === 'undefined' || (typeof args.submit === 'boolean' && args.submit)){
                    
                    console.log(form.serialize());
                    setTimeout(function() { 
                        $(form).hide();
                        $('#success').show();
                    }, 2000);
        
                }
            return form;
        });

        // By default, navigate to the first slide if it is being set using defaultStep property

        typeof args.defaultStep === 'number' ? form.navigateTo(args.defaultStep) : null;
            form.noValidate = function() {
            }
        return form;
    };
}( jQuery ));