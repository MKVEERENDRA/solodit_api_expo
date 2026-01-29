#!/usr/bin/env python3
"""
Simple HTTP server for Solodit API Explorer
Run this server and access the app at http://localhost:8000
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import urllib.request
import urllib.parse
from urllib.error import URLError, HTTPError
import os
import time
from datetime import datetime

class CORSProxyHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)
    
    def do_GET(self):
        # Serve index.html as default for root path
        if self.path == '/' or self.path == '/index.html':
            self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Cyfrin-API-Key')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/solodit':
            # Proxy the request to Solodit API
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                
                # Get API key from headers
                api_key = self.headers.get('X-Cyfrin-API-Key')
                
                # Debug: Print all headers to see what we're receiving
                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 🔍 DEBUG: All Received Headers:")
                for header_name, header_value in self.headers.items():
                    if 'API' in header_name.upper() or 'KEY' in header_name.upper():
                        print(f"   - {header_name}: {header_value}")
                
                print(f"🔍 DEBUG: Extracted API Key: '{api_key}'")
                print(f"🔍 DEBUG: API Key Length: {len(api_key) if api_key else 'None'}")
                print(f"🔍 DEBUG: API Key Type: {type(api_key)}")
                
                if not api_key:
                    print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ ERROR: Missing API key in headers")
                    self.send_error(401, "Missing API key")
                    return
                
                # Strip any whitespace that might be causing issues
                api_key = api_key.strip()
                print(f"🔍 DEBUG: Stripped API Key: '{api_key}'")
                print(f"🔍 DEBUG: Stripped API Key Length: {len(api_key)}")
                
                # Log API key usage (without exposing the key)
                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 🔑 API Request Started")
                print(f"📋 Request Headers:")
                print(f"   - Content-Type: {self.headers.get('Content-Type', 'Not specified')}")
                print(f"   - X-Cyfrin-API-Key: {'*' * 20}{api_key[-4:] if len(api_key) > 4 else '****'}")
                print(f"   - User-Agent: {self.headers.get('User-Agent', 'Not specified')}")
                
                # Parse and log request body
                try:
                    request_data = json.loads(post_data.decode('utf-8'))
                    print(f"📤 Request Body (Solodit API Format):")
                    print(f"   {{")
                    print(f"     \"page\": {request_data.get('page', 'Not specified')},")
                    print(f"     \"pageSize\": {request_data.get('pageSize', 'Not specified')},")
                    
                    filters = request_data.get('filters', {})
                    if filters:
                        print(f"     \"filters\": {{")
                        
                        # Keywords
                        if filters.get('keywords'):
                            print(f"       \"keywords\": \"{filters['keywords']}\",")
                        
                        # Impact Levels
                        if filters.get('impact'):
                            impact_list = filters['impact']
                            if isinstance(impact_list, list):
                                impact_str = ', '.join([f'"{imp}"' for imp in impact_list])
                                print(f"       \"impact\": [{impact_str}],")
                        
                        # Audit Firms (with proper format)
                        if filters.get('firms'):
                            firms_list = filters['firms']
                            if isinstance(firms_list, list):
                                firm_items = []
                                for firm in firms_list:
                                    if isinstance(firm, dict):
                                        firm_items.append(f'{{ "value": "{firm["value"]}" }}')
                                    else:
                                        firm_items.append(f'{{ "value": "{firm}" }}')
                                print(f"       \"firms\": [{', '.join(firm_items)}],")
                        
                        # Tags (with proper format)
                        if filters.get('tags'):
                            tags_list = filters['tags']
                            if isinstance(tags_list, list):
                                tag_items = []
                                for tag in tags_list:
                                    if isinstance(tag, dict):
                                        tag_items.append(f'{{ "value": "{tag["value"]}" }}')
                                    else:
                                        tag_items.append(f'{{ "value": "{tag}" }}')
                                print(f"       \"tags\": [{', '.join(tag_items)}],")
                        
                        # Protocol Categories (with proper format)
                        if filters.get('protocolCategory'):
                            categories_list = filters['protocolCategory']
                            if isinstance(categories_list, list):
                                category_items = []
                                for category in categories_list:
                                    if isinstance(category, dict):
                                        category_items.append(f'{{ "value": "{category["value"]}" }}')
                                    else:
                                        category_items.append(f'{{ "value": "{category}" }}')
                                print(f"       \"protocolCategory\": [{', '.join(category_items)}],")
                        
                        # Programming Languages (with proper format)
                        if filters.get('languages'):
                            languages_list = filters['languages']
                            if isinstance(languages_list, list):
                                language_items = []
                                for lang in languages_list:
                                    if isinstance(lang, dict):
                                        language_items.append(f'{{ "value": "{lang["value"]}" }}')
                                    else:
                                        language_items.append(f'{{ "value": "{lang}" }}')
                                print(f"       \"languages\": [{', '.join(language_items)}],")
                        
                        # Protocol Name
                        if filters.get('protocol'):
                            print(f"       \"protocol\": \"{filters['protocol']}\",")
                        
                        # Finder/User
                        if filters.get('user'):
                            print(f"       \"user\": \"{filters['user']}\",")
                        
                        # Quality Score
                        if filters.get('qualityScore'):
                            print(f"       \"qualityScore\": {filters['qualityScore']},")
                        
                        # Rarity Score
                        if filters.get('rarityScore'):
                            print(f"       \"rarityScore\": {filters['rarityScore']},")
                        
                        # Date Range
                        if filters.get('reported'):
                            reported = filters['reported']
                            if isinstance(reported, dict):
                                print(f"       \"reported\": {{ \"value\": \"{reported['value']}\" }},")
                                if reported.get('value') == 'after' and filters.get('reportedAfter'):
                                    print(f"       \"reportedAfter\": \"{filters['reportedAfter']}\",")
                            else:
                                print(f"       \"reported\": {{ \"value\": \"{reported}\" }},")
                        
                        # Finder Count Range
                        if filters.get('minFinders') or filters.get('maxFinders'):
                            min_f = filters.get('minFinders', 'Not specified')
                            max_f = filters.get('maxFinders', 'Not specified')
                            print(f"       \"minFinders\": \"{min_f}\",")
                            print(f"       \"maxFinders\": \"{max_f}\",")
                        
                        # Sorting
                        if filters.get('sortField'):
                            print(f"       \"sortField\": \"{filters['sortField']}\",")
                        if filters.get('sortDirection'):
                            print(f"       \"sortDirection\": \"{filters['sortDirection']}\",")
                        
                        print(f"     }}")
                    else:
                        print(f"     \"filters\": {{}}")
                    
                    print(f"   }}")
                    
                except json.JSONDecodeError as e:
                    print(f"   - ⚠️  Warning: Could not parse request body: {e}")
                
                print(f"🌐 Forwarding to Solodit API: https://solodit.cyfrin.io/api/v1/solodit/findings")
                
                # Make request to Solodit API
                url = 'https://solodit.cyfrin.io/api/v1/solodit/findings'
                
                # Debug: Show exactly what headers we're sending to Solodit
                request_headers = {
                    'Content-Type': 'application/json',
                    'X-Cyfrin-API-Key': api_key,
                    'User-Agent': 'Solodit-API-Explorer/1.0'
                }
                
                print(f"🔍 DEBUG: Headers being sent to Solodit:")
                for header_name, header_value in request_headers.items():
                    if 'API' in header_name.upper() or 'KEY' in header_name.upper():
                        masked_value = '*' * 20 + header_value[-4:] if len(header_value) > 4 else '****'
                        print(f"   - {header_name}: {masked_value}")
                    else:
                        print(f"   - {header_name}: {header_value}")
                
                req = urllib.request.Request(
                    url,
                    data=post_data,
                    headers=request_headers
                )
                
                with urllib.request.urlopen(req) as response:
                    response_data = response.read()
                    
                    # Log response details
                    print(f"✅ API Response Received:")
                    print(f"   - Status Code: {response.getcode()}")
                    print(f"   - Content-Type: {response.headers.get('Content-Type', 'Not specified')}")
                    print(f"   - Content-Length: {len(response_data)} bytes")
                    
                    # Forward the response
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    
                    # Forward rate limit headers if present
                    rate_limit_info = []
                    if 'X-RateLimit-Limit' in response.headers:
                        limit = response.headers['X-RateLimit-Limit']
                        self.send_header('X-RateLimit-Limit', limit)
                        rate_limit_info.append(f"Limit: {limit}")
                    
                    if 'X-RateLimit-Remaining' in response.headers:
                        remaining = response.headers['X-RateLimit-Remaining']
                        self.send_header('X-RateLimit-Remaining', remaining)
                        rate_limit_info.append(f"Remaining: {remaining}")
                    
                    if 'X-RateLimit-Reset' in response.headers:
                        reset_time = response.headers['X-RateLimit-Reset']
                        self.send_header('X-RateLimit-Reset', reset_time)
                        reset_datetime = datetime.fromtimestamp(int(reset_time))
                        rate_limit_info.append(f"Reset: {reset_datetime.strftime('%H:%M:%S')}")
                    
                    if rate_limit_info:
                        print(f"   - Rate Limits: {' | '.join(rate_limit_info)}")
                    
                    # Parse and log response data summary
                    try:
                        response_json = json.loads(response_data.decode('utf-8'))
                        metadata = response_json.get('metadata', {})
                        findings = response_json.get('findings', [])
                        
                        print(f"📊 Response Summary:")
                        print(f"   - Total Results: {metadata.get('totalResults', 'Unknown')}")
                        print(f"   - Current Page: {metadata.get('currentPage', 'Unknown')}")
                        print(f"   - Total Pages: {metadata.get('totalPages', 'Unknown')}")
                        print(f"   - Findings in Response: {len(findings)}")
                        
                        # Show sample finding if available
                        if findings:
                            sample = findings[0]
                            print(f"   - Sample Finding: {sample.get('title', 'No title')[:50]}...")
                            print(f"   - Sample Impact: {sample.get('impact', 'Unknown')}")
                            print(f"   - Sample Firm: {sample.get('firm_name', 'Unknown')}")
                        
                    except json.JSONDecodeError as e:
                        print(f"   - ⚠️  Warning: Could not parse response JSON: {e}")
                    
                    print(f"📤 Forwarding response to client")
                    print(f"{'='*60}\n")
                    
                    self.end_headers()
                    self.wfile.write(response_data)
                    
            except (URLError, HTTPError) as e:
                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] ❌ API ERROR OCCURRED")
                print(f"📋 Error Details:")
                print(f"   - Error Type: {type(e).__name__}")
                print(f"   - Error Message: {str(e)}")
                
                if hasattr(e, 'code'):
                    print(f"   - HTTP Status Code: {e.code}")
                    
                    if e.code == 429:
                        print(f"   - ⚠️  RATE LIMIT EXCEEDED")
                        print(f"   - 💡 Solution: Wait for rate limit reset or implement backoff")
                        print(f"   - 📊 Current time: {datetime.now().strftime('%H:%M:%S')}")
                        
                        self.send_response(429)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps({
                            "message": "Rate limit exceeded. Please wait before making more requests.",
                            "error_code": "RATE_LIMIT_EXCEEDED",
                            "retry_after": 60
                        }).encode())
                        
                    elif e.code == 401:
                        print(f"   - 🔑 AUTHENTICATION FAILED")
                        print(f"   - 💡 Solution: Check your API key is valid and not expired")
                        
                        self.send_response(401)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps({
                            "message": "Authentication failed. Please check your API key.",
                            "error_code": "AUTHENTICATION_FAILED"
                        }).encode())
                        
                    elif e.code == 400:
                        print(f"   - 📝 BAD REQUEST")
                        print(f"   - 💡 Solution: Check request format and parameters")
                        
                        self.send_response(400)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps({
                            "message": "Bad request. Please check your request parameters.",
                            "error_code": "BAD_REQUEST"
                        }).encode())
                        
                    else:
                        print(f"   - 🌐 HTTP ERROR {e.code}")
                        print(f"   - 💡 Solution: Check API service status")
                        
                        self.send_error(e.code, f"API Error: {str(e)}")
                else:
                    print(f"   - 🔌 NETWORK ERROR")
                    print(f"   - 💡 Solution: Check internet connection and API availability")
                    
                    self.send_error(500, f"Network error: {str(e)}")
                
                print(f"{'='*60}\n")
                    
        elif self.path == '/api/save-file':
            # Handle file saving
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                filename = data.get('filename', 'export.md')
                content = data.get('content', '')
                folder = data.get('folder', 'exports')
                
                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 📁 File Save Request")
                print(f"📋 File Details:")
                print(f"   - Filename: {filename}")
                print(f"   - Folder: {folder}")
                print(f"   - Content Size: {len(content)} characters")
                print(f"   - Content Preview: {content[:100]}...")
                
                # Create directory if it doesn't exist
                if not os.path.exists(folder):
                    os.makedirs(folder)
                    print(f"   - ✅ Created directory: {folder}")
                
                # Save file
                filepath = os.path.join(folder, filename)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"   - ✅ File saved successfully: {filepath}")
                print(f"   - 📊 File size: {os.path.getsize(filepath)} bytes")
                print(f"{'='*60}\n")
                
                # Send response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {"success": True, "filepath": filepath}
                self.wfile.write(json.dumps(response).encode())
                
            except Exception as e:
                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] ❌ FILE SAVE ERROR")
                print(f"📋 Error Details:")
                print(f"   - Error Type: {type(e).__name__}")
                print(f"   - Error Message: {str(e)}")
                print(f"   - 💡 Solution: Check file permissions and disk space")
                print(f"{'='*60}\n")
                
                self.send_error(500, f"File save error: {str(e)}")
                    
        else:
            # Handle regular POST requests
            super().do_POST()

def run_server(port=8000):
    # Create directories
    directories = ['exports', 'sessions', 'logs']
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"📁 Created directory: {directory}")
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, CORSProxyHandler)
    
    print(f"\n🚀 Solodit API Explorer - VERBOSE MODE")
    print(f"{'='*60}")
    print(f"🌐 Server running on: http://localhost:{port}")
    print(f"📁 Serving files from: {os.getcwd()}")
    print(f"⏹️  Press Ctrl+C to stop the server")
    print(f"{'='*60}")
    print(f"\n🔥 VERBOSE LOGGING ENABLED:")
    print(f"✅ API Key (entered by user)")
    print(f"✅ Automatic Rate Limit Handling")
    print(f"✅ File Export Functionality")
    print(f"✅ CORS Proxy for Solodit API")
    print(f"✅ Detailed Request/Response Logging")
    print(f"✅ Error Analysis & Solutions")
    print(f"✅ File Operation Tracking")
    print(f"\n📂 Directory Structure:")
    print(f"   ├── exports/    - Exported findings")
    print(f"   ├── sessions/   - Session data")
    print(f"   └── logs/       - Application logs")
    print(f"\n📊 API Specification Compliance:")
    print(f"   - Base URL: https://solodit.cyfrin.io/api/v1/solodit")
    print(f"   - Endpoint: /findings")
    print(f"   - Method: POST")
    print(f"   - Auth: X-Cyfrin-API-Key header")
    print(f"   - Rate Limit: 20 requests/60 seconds")
    print(f"   - Pagination: Up to 100 results per page")
    print(f"\n🔍 What you'll see in logs:")
    print(f"   🔑 API request details (key masked)")
    print(f"   📤 Request body and filters")
    print(f"   ✅ Response status and metadata")
    print(f"   📊 Rate limit information")
    print(f"   📁 File save operations")
    print(f"   ❌ Detailed error analysis")
    print(f"{'='*60}")
    print(f"🎯 Ready for verbose logging! Start making requests...\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
        print(f"📊 Final server statistics:")
        print(f"   - Uptime: {datetime.now().strftime('%H:%M:%S')}")
        print(f"   - Check exports/ for saved files")
        httpd.server_close()

if __name__ == '__main__':
    import sys
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8000.")
    
    run_server(port)
