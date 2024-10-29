import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const MyToken = localStorage.getItem('token');
  const cloneRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${MyToken}`
    }
  })
  return next(cloneRequest);
};
