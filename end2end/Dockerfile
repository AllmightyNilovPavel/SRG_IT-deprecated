FROM zenika/alpine-chrome:89-with-node-14

USER root
RUN apk add --no-cache chromium-chromedriver bash
RUN ln -s /usr/bin/chromium-browser /usr/bin/chrome

ENV headless true

# dependency
COPY ./package.json .
COPY ./yarn.lock .
RUN mkdir -p /.yarn
RUN yarn install --non-interactive
RUN rm /usr/src/app/node_modules/chromedriver/lib/chromedriver/chromedriver
RUN ln -s /usr/bin/chromedriver /usr/src/app/node_modules/chromedriver/lib/chromedriver/chromedriver

# source code
COPY . .
CMD ["./starter.sh"]
