from flask import jsonify


def success(data):
    return jsonify({"success": True, "data": data})


def error(message, status=400):
    return jsonify({"success": False, "error": message}), status
