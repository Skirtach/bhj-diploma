/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    console.log(xhr)
    let queryParams = '';
    formData = new FormData();
    if(options.data){
      if(options.method === 'GET'){
        queryParams = '?' + Object.entries(options.data).map(([key,value])=>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        ).join('&');
        } else {
         Object.entries(options.data).forEach(v=>formData.append(...v));
        }
    }

    
    try {
        xhr.open(options.method, options.url + queryParams); 
        xhr.responseType = 'json'; 
        xhr.send(formData);  
    }
    
    catch(err) {
        options.callback(err);
    }
     
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let err = null;
                let response = null;
                if (xhr.status === 200) {
                    if(xhr.response?.success) {
                        response = xhr.response;
                    } else {
                        err = xhr.response;
                    }
                } else {
                    err = new Error('Ошибка!')
                }
                options.callback(err, response);              
           }              
        };
              
 return xhr;
};


