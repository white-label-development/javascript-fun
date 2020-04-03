
## Reactive Forms

https://github.com/DeborahK/Angular-ReactiveForms

##### template driven forms: 

template driven html and data binding. Easy. Two way data binding. Automaticaly tracks form and input element state (when form is invalid etc)

##### reactive (model driven) forms: 

defining form model and validation in component code.

+ more flexible
+ immutable data model. no data binding. form cannot mutate model
+ easier to perform an action on a value change
+ reactive transformations -> DebounceTime or DistinctUntilChanged
+ easily add input elements dynamically
+ easier unit testing.
+ but requires more code.


##### Form and InputElement State: 

+ Value Changed :pristine or dirty (dirty = changed. if all are pristine, the form is pristine)

+ Validity: valid or errors collection (form is valid if all input elements are valid)

+ Visited: touched or untouched (touched - focus has been set and focus left)


Angular's Form Building Blocks track state and value for us

FormControl - track an individual input element

FormGroup - track a collection of FormControls. The form itself is managed as a FormGroup. FormGroups can be nested. The "Forms FormGroup" is the root.

The FormModel is a data structure that represents the form: FormControls, State, Values (of user input into form elements), Error etc.

Template Driven Form generate the FormModel from the template (behind the scenes) but Reactive Forms explicity create the Form model, validation rules and so on, all in the Component Class.

Reactive Froms bind these input elements in the template to the FormModel defined in the component class, instead of binding the input elements to the data model properties directly (like Template Driven Forms do).



##### Template (FormsModule): 

`ngForm, ngModel, ngModelGroup`: Ng automatically creates a formModel, starting with the root FormGroup instance; it assigns an ngForm directive to any form we add to the template. We can add a template reference to access it (to export it), eg:

```
<form (ngSubmit)="save()" #signupForm="ngForm">

  <input id="firstNameId" [(ngModel)]="customer.firstName" #firstNameVar="ngModel" name="firstName" />

  <button type="submit" [disabled]="!signupForm.valid"> ...
```

The signupForm variable provides a reference to the forms root FormGroup instance. The ngModel directive is used in each input element to keep the value in sync with the component class property (MVVM, two way binding paradigm). Adding the ngModel tells Ng to automatically create a FormControl instance for us, using the input elements name.

##### Reactive (ReactiveFormsModule):

`formGroup, fromControl, formControlName, FormGroupName, formArrayName`

We create the formModel ourselves. 

Commonly a FormBuilder is provided in the ctor, which is used to build the form from the fromGroups and formControls we have defined.

The template has a lot let Ng attributes.

```
<form (ngSubmit)="save()" [formGroup]="signupForm")>
  <input formControlName="firstName"> ...
```

Form does not directly modify the FormModel.

Create a new FormGroup, usually in ngOnInit(). This is the FormModel (not the data model).

```
customerForm.controls.firstName.valid
customerForm.get('firstName').valid
```

Without two-way binding how do we update the form from it's initial values?

`setValue` is used to update *every* FormControl in the FormModel.
```
this.customerForm.setValue(
  {
    firstName: 'Jack',
    lastName: 'Harkness'
  }
);
```

use `patchValue` to update a subset
```
this.customerForm.patchValue(
  {
    firstName: 'Jack'    
  }
);
```

The FormBuilder is class we can use to create a FormGroup for us, from a configuration. Usually injected, eg: `(private fb: FormBuilder)`.

```
// we are defining a template for the form. Note the 3 styles
this.customerForm = this.fb.group({
  firstName: '',
  lastName: ['', [Validators.required, Validators.minLength(3)]],
  sendCatalog: {value: true, disabled: false}
  ...
});
```

async validators are the third paramter of the array style (lastName).

We can adjust validation rules at runtime.
```
myControl.clearValidators();
myControl.setValidators(Validators.email);
myControl.updateValueAndValidity(); //optional. apply the new validators (ie: check is valid against the value)
```

Custom Validation Rules:

A custom validator is a function

```
function myValidator (c: AbstractControl): {[key: string] : boolean} | null {
  if(somethingIsWrong){ return { 'myvalidator': true }; } //key is the name of the broken validation rule
  return null; 
}

// in the fb.group:
myvalidator: [null, myValidator]
```

A validator function can only take one parameter. If we need to pass in more we need to wrap the function in a factory function and return the validator function (now an arrow function).

```
function myValidator (param: any): ValidatorFn {
  return (c: AbstractControl): {[key: string] : boolean} | null => {
    if(somethingIsWrong){ return { 'myvalidator': true }; } 
    return null; 
  };
}
```

Cross field validation is achieved using a nested FormGroup

```
availability: this.fb.group({
  start: ['', Validators.required],
  end: ['', Validators.required]
})

// and in the html
<div formGroupName="availability">
  <input formControlName="start" />
  <input formControlName="end" />
</div>

```

(revisiting the concepts)

We create a form instance on our component, this instance exposes an observable, a stream of all the input fields combined into a object, via it’s valueChanges property. We can subscribe to that observable and print our the current value of the form, like so:
```
 constructor(fb: FormBuilder) {     
   this.form = fb.group({
     "comment": this.comment,      
     "name": this.name,       
     "email": this.email
   });     
   this.form.valueChanges.subscribe(data => console.log(JSON.stringify(data)));   
   
   //as "f" is entered into comment we get {"comment":"f","name":"","email":""} 
   //as "o" is entered into comment we get {"comment":"fo","name":"","email":""} 
 }
```

The above example produces lots of noise. we can improve this using filter.  filter accepts a function and passes to it each item in the stream, if the function returns true filter publishes the input item to the output stream.
```
this.form.valueChanges.filter(data => this.form.valid).subscribe(data => console.log(JSON.stringify(data)));

// filter only publishes the outputstream the lambda is true - ie: if comment, name, email are all valid = form is valid.
```

and here's a (double) map example as I forgot the syntax last time (what is returned from a map goes into the output stream)
```
//first map strips script tags; second map adds a new property to data (cool...)
 this.form.valueChanges .filter(data => this.form.valid)         
   .map(data => {data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');           
     return data         
   })
   .map(data => {          
     data.lastUpdateTS = new Date();            
     return data         
   }) 
   .subscribe(data => console.log(JSON.stringify(data)));
```

The above can be down without observables and reactive programming (and in this example is arguably the better way). Reactive has more power due to it's operators (debounce etc)
```
this.form.valueChanges         
  .subscribe( data => {           
    if (this.form.valid) {             
      data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');             
      data.lastUpdateTS = new Date();             
      console.log(JSON.stringify(data))           
    }         
});
```