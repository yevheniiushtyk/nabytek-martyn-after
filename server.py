import http.server
import os
import urllib.parse
import signal
import socketserver

# Configuration
SERVE_THREADED = True  # Adjust this based on your needs
TIMEOUT = 1  # Adjust this based on your needs
PORT = 8000

# Request handler
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        url_parts = urllib.parse.urlparse(self.path)
        path_without_extension = url_parts.path

        if path_without_extension.endswith('/'):
            path_without_extension = path_without_extension[:-1]

        html_file_path = path_without_extension + '.html'
        if os.path.isfile(self.translate_path(html_file_path)):
            self.path = html_file_path

        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def send_head(self):
        """Override to skip os.fstat call"""
        path = self.translate_path(self.path)
        f = None
        if os.path.isdir(path):
            parts = urllib.parse.urlsplit(self.path)
            if not parts.path.endswith('/'):
                # redirect browser - doing basically what apache does
                self.send_response(http.HTTPStatus.MOVED_PERMANENTLY)
                new_parts = (parts[0], parts[1], parts[2] + '/',
                             parts[3], parts[4])
                new_url = urllib.parse.urlunsplit(new_parts)
                self.send_header("Location", new_url)
                self.end_headers()
                return None
            for index in ("index.html", "index.htm"):
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break
            else:
                return self.list_directory(path)
        ctype = self.guess_type(path)
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(http.HTTPStatus.NOT_FOUND, "File not found")
            return None
        self.send_response(http.HTTPStatus.OK)
        self.send_header("Content-type", ctype)
        self.end_headers()
        return f

# Server classes
class ThreadingSimpleServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    timeout = TIMEOUT

class SimpleServer(http.server.HTTPServer):
    timeout = TIMEOUT

# Choose server class based on threading configuration
HTTPServer = ThreadingSimpleServer if SERVE_THREADED else SimpleServer

httpd = HTTPServer(('localhost', PORT), MyHTTPRequestHandler)

def signal_handler(sig, frame):
    print("\nForce stopping server...")
    os._exit(0)

signal.signal(signal.SIGINT, signal_handler)

def start_server():
    try:
        print(f"Server running at http://localhost:{PORT}\n")
        httpd.serve_forever()

    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")
        os._exit(1)

if __name__ == "__main__":
    start_server()
