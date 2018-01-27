'use strict';

(function(){
    
    function ValidateForm(form, err){
        
        this._form = document.querySelector(form) || document.querySelector('form');
        
        this._errors = document.querySelector(err) || document.querySelector('#errors')
        
        this._assignEvents();
    }
    
    ValidateForm.prototype._assignEvents = function(){
        this._form.addEventListener('submit', this._validateFields.bind(this), true);     
    }
    
    ValidateForm.prototype._validateFields = function(e){
        this._errors.innerHTML = '';
        this._tabErrors = [];
        
        if(!e.target[0].value){
            this._addErrors('Uzupełnij pole e-mail');
        }        
        
        this._mailPattern = /^\w+[.-]*[a-z\d]*@\w+[.-]*[a-z\d]*\.[a-z]{2,8}$/;
        
        if(e.target[0].value && !this._mailPattern.test(e.target[0].value)){
            this._addErrors('Pole e-mail musi spełniać wymagania złożoności');
        }
        
        if(!e.target[1].value){
            this._addErrors('Uzupełnij pole data urodzenia');
        }
        
        this._dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
        
        if(e.target[1].value && !this._dateOfBirthPattern.test(e.target[1].value)){
            this._addErrors('Pole data urodzenia musi spełniać wymagania złożoności');
        }
        
        if(!e.target[2].value){
            this._addErrors('Uzupełnij treści wiadomości');
        }
        
        this._textareaPattern = /^\w{6,}$/
        if(e.target[2].value && !this._textareaPattern.test(e.target[2].value)){
            this._addErrors('Treść wiadomości musi zawierać minimum 6 znaków');
        }
        
        if(this._tabErrors == 0){
            this._addErrors(`Dziękujemy, Twoja wiadomość została przesłana. Odpowiedź wyślemy na maila: ${e.target[0].value}`)
        }
        
        if(this._tabErrors.length >= 0){
            e.preventDefault();
        }
       
    }
    
    ValidateForm.prototype._addErrors = function(error){
        this._tabErrors.push(error);
        this._showErrors();
    }
    
    ValidateForm.prototype._showErrors = function(){
        this._allErrors = '';
        for(let i in this._tabErrors){
            this._allErrors = `${this._tabErrors[i]}<br>`;
        }
        
        this._errors.innerHTML += `${this._allErrors}`;
        console.log(this._tabErrors);
    }
    
    new ValidateForm();
    
})();