(function ( $ ) {
    $.fn.multiStepForm = function(args) {
        if(args === null || typeof args !== 'object' || $.isArray(args))
            throw  " : Called with Invalid argument";
            
        var form = this;
        var steps = form.find('.step');
        
        form.navigateTo = function (i) {/*index*/
            
            /*Mark the current section with the class 'current'*/
            
            steps.removeClass('current').eq(i).addClass('current');
            
            // Show only the navigation buttons that make sense for the current section:
            
            atTheEnd = i >= steps.length - 1;
            form.find('.next').toggle(!atTheEnd);
            form.find('.submit').toggle(atTheEnd);
            
            return form;
        }
        function curIndex() {
            /*Return the current index by looking at which section has the class 'current'*/
            return steps.index(steps.filter('.current'));
        }
      
        /* Next button goes forward if current block validates */
        form.find('.next').click(function() {
            if('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)){
            if(!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)){
                form.validate(args.validations);
                if(form.valid() == true){
                    form.navigateTo(curIndex() + 1);
                return true;
                }
                return false;
                }
            }
            form.navigateTo(curIndex() + 1);
        });

        form.find('.submit').on('click', function(e){
            
            e.preventDefault(); 
            
            if(typeof args.beforeSubmit !== 'undefined' && typeof args.beforeSubmit !== 'function')
                args.beforeSubmit(form, this);
                /*check if args.submit is set false if not then form.submit is not gonna run, if not set then will run by default*/        
                if(typeof args.submit === 'undefined' || (typeof args.submit === 'boolean' && args.submit)){
                    const formData = form.serialize();
                    
                    console.log(formData);
                    //form.submit(formData);
                    // simulates reload on success. 
                    // setTimeout(function(){
                    //     window.location.reload();
                    // }, 3000);
                }
            return form;
        });

        /* By default navigate to the tab 0, if it is being set using defaultStep property */
        typeof args.defaultStep === 'number' ? form.navigateTo(args.defaultStep) : null;
            form.noValidate = function() {
            }
        return form;
    };
}( jQuery ));