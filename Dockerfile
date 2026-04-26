FROM nginx:alpine

COPY index.html      /usr/share/nginx/html/
COPY gallery.html    /usr/share/nginx/html/
COPY trajectories_data.js /usr/share/nginx/html/
COPY images/         /usr/share/nginx/html/images/
COPY textures/       /usr/share/nginx/html/textures/
COPY nginx.conf      /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
