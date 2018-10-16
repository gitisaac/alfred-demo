from tornado import web, ioloop

class MainHandler(web.RequestHandler):
    def get(self):
        self.write("Hello New World!")

def make_app():
    return web.Application([("/", MainHandler)], debug=True)

if __name__ == "__main__":
    app = make_app()
    app.listen(3231)
    ioloop.IOLoop.current().start()
