$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server started on http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        # Remove leading slash for Join-Path
        $relPath = $path.TrimStart('/')
        $filePath = Join-Path (Get-Location) $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Determine Content-Type
            $ext = [System.IO.Path]::GetExtension($filePath)
            $contentType = "text/plain"
            if ($ext -eq ".html") { $contentType = "text/html; charset=utf-8" }
            elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
            elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
            elseif ($ext -eq ".png") { $contentType = "image/png" }

            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errorBytes = [System.Text.Encoding]::UTF8.GetBytes("File not found")
            $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "Error occurred: $_"
} finally {
    $listener.Stop()
    Write-Host "Server stopped."
}
