// Print a PDF's page count and extracted text (PDFKit), to check the text layer.
// Usage: swift scripts/pdf-text.swift public/WhiteChang-Resume.en.pdf
import Foundation
import PDFKit

guard CommandLine.arguments.count > 1, let doc = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1])) else {
  FileHandle.standardError.write("usage: pdf-text.swift <file.pdf>\n".data(using: .utf8)!)
  exit(1)
}
print("pages: \(doc.pageCount)")
print(doc.string ?? "")
