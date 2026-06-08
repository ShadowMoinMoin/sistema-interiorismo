package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.model.Cliente;
import com.dlinteriorismo.sistema_interiorismo.model.Empleado;
import com.dlinteriorismo.sistema_interiorismo.repository.ClienteRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.EmpleadoRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.CotizacionRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.FacturaRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.PagoRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.TareaRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.ProyectoRepository;
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
    private final ProyectoRepository proyectoRepository;
    private final CotizacionRepository cotizacionRepository;
    private final FacturaRepository facturaRepository;
    private final PagoRepository pagoRepository;
    private final TareaRepository tareaRepository;

    public ReporteController(
            ClienteRepository clienteRepository,
            EmpleadoRepository empleadoRepository,
            ProyectoRepository proyectoRepository,
            CotizacionRepository cotizacionRepository,
            FacturaRepository facturaRepository,
            PagoRepository pagoRepository,
            TareaRepository tareaRepository) {

        this.clienteRepository = clienteRepository;
        this.empleadoRepository = empleadoRepository;
        this.proyectoRepository = proyectoRepository;
        this.cotizacionRepository = cotizacionRepository;
        this.facturaRepository = facturaRepository;
        this.pagoRepository = pagoRepository;
        this.tareaRepository = tareaRepository;
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
    @GetMapping("/proyectos-excel")
    public void exportarProyectosExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=proyectos.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Proyectos");

        String[] columnas = {
                "ID",
                "Proyecto",
                "Cliente",
                "Tipo",
                "Inicio",
                "Fin",
                "Estado"
        };

        Row header = sheet.createRow(0);

        for (int i = 0; i < columnas.length; i++) {
            header.createCell(i).setCellValue(columnas[i]);
        }

        int fila = 1;

        for (var p : proyectoRepository.findAll()) {

            Row row = sheet.createRow(fila++);

            row.createCell(0).setCellValue(p.getIdProyecto());
            row.createCell(1).setCellValue(p.getNombreProyecto());
            row.createCell(2).setCellValue(p.getCliente().getNombre());
            row.createCell(3).setCellValue(p.getTipoProyecto().getNombreTipo());
            row.createCell(4).setCellValue(String.valueOf(p.getFechaInicio()));
            row.createCell(5).setCellValue(String.valueOf(p.getFechaFin()));
            row.createCell(6).setCellValue(p.getEstado());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
    @GetMapping("/cotizaciones-excel")
    public void exportarCotizacionesExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=cotizaciones.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Cotizaciones");

        String[] columnas = {
                "ID",
                "Proyecto",
                "Fecha",
                "Metraje",
                "Subtotal",
                "Ganancia",
                "Total",
                "Estado"
        };

        Row header = sheet.createRow(0);

        for (int i = 0; i < columnas.length; i++) {
            header.createCell(i).setCellValue(columnas[i]);
        }

        int fila = 1;

        for (var c : cotizacionRepository.findAll()) {

            Row row = sheet.createRow(fila++);

            row.createCell(0).setCellValue(c.getIdCotizacion());
            row.createCell(1).setCellValue(c.getIdProyecto());
            row.createCell(2).setCellValue(String.valueOf(c.getFecha()));
            row.createCell(3).setCellValue(c.getMetraje().doubleValue());
            row.createCell(4).setCellValue(c.getSubtotal().doubleValue());
            row.createCell(5).setCellValue(c.getGanancia().doubleValue());
            row.createCell(6).setCellValue(c.getTotal().doubleValue());
            row.createCell(7).setCellValue(c.getEstado());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
    @GetMapping("/facturas-excel")
    public void exportarFacturasExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=facturas.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Facturas");

        String[] columnas = {
                "ID",
                "Número",
                "Fecha",
                "Total",
                "Estado"
        };

        Row header = sheet.createRow(0);

        for (int i = 0; i < columnas.length; i++) {
            header.createCell(i).setCellValue(columnas[i]);
        }

        int fila = 1;

        for (var f : facturaRepository.findAll()) {

            Row row = sheet.createRow(fila++);

            row.createCell(0).setCellValue(f.getIdFactura());
            row.createCell(1).setCellValue(f.getNumeroFactura());
            row.createCell(2).setCellValue(String.valueOf(f.getFecha()));
            row.createCell(3).setCellValue(f.getTotal().doubleValue());
            row.createCell(4).setCellValue(f.getEstado());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
    @GetMapping("/pagos-excel")
    public void exportarPagosExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=pagos.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Pagos");

        String[] columnas = {
                "ID",
                "Factura",
                "Fecha",
                "Método",
                "Monto",
                "Referencia"
        };

        Row header = sheet.createRow(0);

        for (int i = 0; i < columnas.length; i++) {
            header.createCell(i).setCellValue(columnas[i]);
        }

        int fila = 1;

        for (var p : pagoRepository.findAll()) {

            Row row = sheet.createRow(fila++);

            row.createCell(0).setCellValue(p.getIdPago());
            row.createCell(1).setCellValue(p.getIdFactura());
            row.createCell(2).setCellValue(String.valueOf(p.getFechaPago()));
            row.createCell(3).setCellValue(p.getMetodoPago());
            row.createCell(4).setCellValue(p.getMonto().doubleValue());
            row.createCell(5).setCellValue(p.getReferencia());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
    @GetMapping("/tareas-excel")
    public void exportarTareasExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=tareas.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Tareas");

        String[] columnas = {
                "ID",
                "Proyecto",
                "Empleado",
                "Descripción",
                "Fecha Límite",
                "Estado"
        };

        Row header = sheet.createRow(0);

        for (int i = 0; i < columnas.length; i++) {
            header.createCell(i).setCellValue(columnas[i]);
        }

        int fila = 1;

        for (var t : tareaRepository.findAll()) {

            Row row = sheet.createRow(fila++);

            row.createCell(0).setCellValue(t.getIdTarea());
            row.createCell(1).setCellValue(t.getIdProyecto());
            row.createCell(2).setCellValue(t.getIdEmpleado());
            row.createCell(3).setCellValue(t.getDescripcion());
            row.createCell(4).setCellValue(String.valueOf(t.getFechaLimite()));
            row.createCell(5).setCellValue(t.getEstado());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}