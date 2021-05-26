import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Ticket from './ticket-display';
import { useTable, useFilters, usePagination, useSortBy } from "react-table"
import { Button, Col, Form, FormControl, InputGroup, Modal, Row, Table as BSTable, Image, Accordion } from "react-bootstrap";
import { BiFilterAlt, BiDownArrowAlt, BiUpArrowAlt, BiMinus } from 'react-icons/bi'

export default function TicketList({columns, data}) {
    const [filterInput, setFilterInput] = useState("");

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length

        return (
            <input
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
            />
        )
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {
            hiddenColumns:["id"],
            sortBy: [{
                id: "reference",
                desc: true
            }],
        }
    },
        useFilters,
        useSortBy,
        usePagination
    )

    const handleDoubleClick = e => {
        var ticketId = data.filter(f => f.id === e.target.parentNode.firstElementChild.innerHTML)[0].id;
        //getUserData(userId);
        //handleShow();
    }

    return (
        /*<div>
            <br></br>
            <h3>Open Tickets</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Project</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getOpenList()}
                </tbody>
            </table>
            <br></br>
            <h3>Resolved Tickets</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Project</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getResolvedList()}
                </tbody>
            </table>
        </div>*/
        <BSTable responsive striped bordered hover {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th>
                                <Accordion>
                                    <Row>
                                        <Col md="6" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}{column.canSort ? column.isSorted ? column.isSortedDesc ? <BiDownArrowAlt /> : <BiUpArrowAlt /> : <BiMinus /> : '\u00A0'}
                                        </Col>
                                        <Col md="6" style={{ float: "right", textAlign: "right" }}>
                                            <Accordion.Toggle as={Col} eventKey="0">
                                                {column.canFilter ? <BiFilterAlt /> : null}
                                            </Accordion.Toggle>
                                        </Col>
                                    </Row>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="filter-text">{column.canFilter ? column.render('Filter') : null}</div>
                                    </Accordion.Collapse>
                                </Accordion>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr onDoubleClick={handleDoubleClick} className="bodyrow" {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </BSTable>
    );
}