package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.model.Cliente;
import com.dlinteriorismo.sistema_interiorismo.model.Empleado;
import com.dlinteriorismo.sistema_interiorismo.repository.ClienteRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.EmpleadoRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    private final ClienteRepository clienteRepository;
    private final EmpleadoRepository empleadoRepository;

    public ReporteController(ClienteRepository clienteRepository,
                             EmpleadoRepository empleadoRepository) {
        this.clienteRepository = clienteRepository;
        this.empleadoRepository = empleadoRepository;
    }

    @GetMapping("/clientes-excel")
    public void exportarClientesExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=clientes.xlsx");

        List<Cliente> clientes = clienteRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Clientes");

        Row header = sheet.createRow(0);
        String[] columnas = {"ID", "Nombre", "DNI", "Teléfono", "Correo", "Dirección"};

        for (int i = 0; i < columnas.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(columnas[i]);
        }

        int fila = 1;

        for (Cliente c : clientes) {
            Row row = sheet.createRow(fila++);

            row.createCell(0).setCellValue(c.getIdCliente());
            row.createCell(1).setCellValue(c.getNombre());
            row.createCell(2).setCellValue(c.getDni());
            row.createCell(3).setCellValue(c.getTelefono());
            row.createCell(4).setCellValue(c.getCorreo());
            row.createCell(5).setCellValue(c.getDireccion());
        }

        for (int i = 0; i < columnas.length; i++) {
            sheet.autoSizeColumn(i);
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @GetMapping("/empleados-excel")
    public void exportarEmpleadosExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=empleados.xlsx");

        List<Empleado> empleados = empleadoRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Empleados");

        Row header = sheet.createRow(0);
        String[] columnas = {"ID", "Nombre", "Cargo", "Teléfono", "Correo"};

        for (int i = 0; i < columnas.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(columnas[i]);
        }

        int fila = 1;

        for (Empleado e : empleados) {
            Row row = sheet.createRow(fila++);

            row.createCell(0).setCellValue(e.getIdEmpleado());
            row.createCell(1).setCellValue(e.getNombre());
            row.createCell(2).setCellValue(e.getCargo());
            row.createCell(3).setCellValue(e.getTelefono());
            row.createCell(4).setCellValue(e.getCorreo());
        }

        for (int i = 0; i < columnas.length; i++) {
            sheet.autoSizeColumn(i);
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}